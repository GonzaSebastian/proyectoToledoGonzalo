import userModel from "../models/user.model.js"
import { getCartByIdController } from "../controllers/cart.controller.js";
import { ProductService } from "../services/index.js";

// VIEW PRODUCTS ECOMMERCE
export const viewsGetProducts = async (req, res) => {
  try {
    const result = (await ProductService.getAllPaginate(req, res)).response
    
    const user = await userModel.findById(req.session?.passport?.user).lean().exec();
  
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
    
    const user = await userModel.findById(req.session?.passport?.user).lean().exec();

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
  const cartId = req.params.cid
  
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