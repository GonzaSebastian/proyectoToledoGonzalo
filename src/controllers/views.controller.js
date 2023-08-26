import { productModel } from "../dao/models/product.model.js"
import userModel from "../dao/models/user.model.js"
import { getCartById } from "../controllers/cart.controller.js";

export const viewsGetProducts = async (req, res) => {
  let page = parseInt(req.query.page) 
  let limit = parseInt(req.query.limit)
  let stock = req.query.stock
  let category = req.query.category
  let sort = req.query.sort

  try {
    if (!page) page = 1
    if (!limit) limit = 10
    if (sort === 'asc') sort = {price: 1}
    if (sort === 'desc') sort = {price: -1}
    const filterOption = {}
    if (stock) filterOption.stock = stock
    if (category) filterOption.category = category
    const productsPaginate = await productModel.paginate(filterOption, {page, limit, sort, lean: true})
    const {docs, ...rest} = productsPaginate
    let result = {docs, ...rest}

    result.prevLink = result.hasPrevPage ? `?page=${result.prevPage}` : ''
    result.nextLink = result.hasNextPage ? `?page=${result.nextPage}` : ''
    
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

export const viewsGetProductsRealTime = async(req, res) => {
  let page = parseInt(req.query.page) 
  let limit = parseInt(req.query.limit)
  let stock = req.query.stock
  let category = req.query.category
  let sort = req.query.sort

  try {
    if (!page) page = 1
    if (!limit) limit = 10
    if (sort === 'asc') sort = {price: 1}
    if (sort === 'desc') sort = {price: -1}
    const filterOption = {}
    if (stock) filterOption.stock = stock
    if (category) filterOption.category = category
    const productsPaginate = await productModel.paginate(filterOption, {page, limit, sort, lean: true})
    const {docs, ...rest} = productsPaginate
    let result = {docs, ...rest}

    result.prevLink = result.hasPrevPage ? `?page=${result.prevPage}` : ''
    result.nextLink = result.hasNextPage ? `?page=${result.nextPage}` : ''
    
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

export const viewsCart = async(req, res) => {
  const cartId = req.params.cid
  
  try {
    let cartView = await getCartById(cartId)

    res.render("cart", {
      title: "Carrito",
      cart: cartView
    })
  } catch(err) {
    res.status(404).json({ status: 'error', error: err.message })
  }
}