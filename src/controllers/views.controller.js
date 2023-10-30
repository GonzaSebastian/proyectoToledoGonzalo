import { getCartByIdController } from "../controllers/cart.controller.js";
import { ProductService, UserService, ChatService } from "../services/index.js";

// VIEW PRODUCTS ECOMMERCE
export const viewsGetProducts = async (req, res) => {
  try {
    const result = (await ProductService.getAllPaginate(req, res)).response
    
    const user = await UserService.getUser(req.session?.passport?.user)
  
    res.render("products", {
      title: "Productos",
      products: result,
      user: user
    })

  } catch(err) {
    res.status(404).json({ status: 'error', error: err.message })
  }
}

// VIEW PRODUCTS ADMIN
export const viewsGetProductsRealTime = async(req, res) => {
  try {
    const result = (await ProductService.getAllPaginate(req, res)).response
    
    const user = await UserService.getUser(req.session?.passport?.user)

    res.render("realTimeProducts", {
      title: "Productos RealTime",
      products: result,
      user: user
    })
  }catch(err) {
    res.status(404).json({ status: 'error', error: err.message })
  }
}

// VIEW CART USER
export const viewsCart = async(req, res) => {
  const user = await UserService.getUser(req.session?.passport?.user)
  const cartId = user.cart
  
  try {
    let cartView = await getCartByIdController(cartId)

    res.render("cart", {
      title: "Carrito",
      cart: cartView
    })
  } catch(err) {
    res.status(404).json({ status: 'error', error: err.message })
  }
}

export const chatViewController = async (req, res) => {
  try {
    const user = req.user

    const messages = await ChatService.getMessages()
    res.render("chat", { user, messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};