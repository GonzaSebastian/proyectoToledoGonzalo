import { CartService, ProductService, UserService } from "../services/index.js"
import { generateUniqueCode } from "../utils.js"
import { getBill } from "../services/nodemailer.js"

  export const getCartController = async (req, res) => {
    try {
      const carts = await CartService.getAll()
      res.status(200).json({ status: 'success', payload: carts })
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

  export const getCartByIdController = async(id) => await CartService.getById(id)

  export const addCartController = async (req, res) => {
    try {
      const cart = await CartService.create()
      res.status(200).json({ status: 'success', payload: cart })
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

  export const addProductInCartController = async (req, res) => {
    try {
      const cart = await CartService.addToCart(req)
      res.status(200).json({ status: 'success', payload: cart})
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  
  }

  export const deleteProductInCartController = async (req, res) => {

    try {
      const cart = await CartService.deleteToCart(req)
      
      res.status(200).json({status: 'success', payload: cart})
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

  export const cleanCartController = async (req, res) => {
    try{
      const cart = await CartService.emptyCart(req.params.cid)
      res.status(200).json({status: 'success', payload: cart})
    } catch(err) {
      res.status(404).json({ status: 'error', error: err.message })
    }
  }

  export const updateQuantityProductController = async (req, res) => {
    try{
      const cart = await CartService.updateQuantity(req)

      res.status(200).json({status: 'success', payload: cart})
    } catch(err) {
      res.status(404).json({status: 'error', error: err.message})
    }
  
  }

  export const purchaseCartController = async (req, res) => {
    const cart = await CartService.getById(req.params.cid)  
    const user = await UserService.getUserById(cart.user)

    if (!cart) return res.sendRequestError(`The cart with id ${cid} does not exist`);

    // COUNTER TOTAL PURCHASE
    let amount = 0
    try {
      for (const item of cart.products) {
        const product = await ProductService.getById(item.product)
        if(!product) throw new Error(`Product not found - ID ${item.product}`)
        amount += product.price * item.quantity
      }
      amount = Number(amount.toFixed(2))

      // PRODUCT PURCHASE LOGIC
      const productsPurchase = []
      const productsRemove = []

      for (const item of cart.products) {
        const product = await ProductService.getById(item.product)

        if (!product) {
          // Si el producto no existe, agrega su ID a la lista de productos a remover
          productsRemove.push(item.product);
          continue;
        }

        // if (product.stock === 0) {
        //   await ProductService.update(product._id, product);
        // }

        if (product.stock >= item.quantity) {
          product.stock -= item.quantity
          await ProductService.updateStock(item.product, product)

          productsPurchase.push(item)
        }
      }

      if (productsPurchase.length > 0) {
        const newTicket = {
          code: generateUniqueCode(),
          purchase_date: new Date(),
          amount: amount,
          purchaser: user.email,
          products: productsPurchase.map((item) =>({
            product: item.product,
            quantity: item.quantity
          }))
        }
        const saveTicket = await CartService.createPurchase(newTicket)

        await getBill(saveTicket, user)
        // FILTER PRODUCT NOT STOCK
        // cart.products = cart.products.filter(
        //   (item) =>
        //     !productsPurchase.some(
        //       (prod) => prod.product === item.product
        //     )
        // )
        // Asocia el ID del ticket con la compra en el carrito
        // cart.ticket = saveTicket._id;
        // await CartService.updatedCart({ _id: cid }, cart);


        res.status(200).json({status: 'success', payload: saveTicket})
      }

    } catch(error) {
      res.status(400).json({status: 'error', message: error.message})
    }




  }