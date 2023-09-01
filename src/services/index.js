import productDAO from "../dao/product.mongo.dao.js";
import ProductRepository from "../repositories/product.repository.js";
import cartDAO from "../dao/cart.mongo.dao.js";
import CartRepository from "../repositories/cart.repository.js";


export const ProductService = new ProductRepository(new productDAO)
export const CartService = new CartRepository(new cartDAO)