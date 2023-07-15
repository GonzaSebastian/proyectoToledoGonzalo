import mongoose from "mongoose"

const productsCollection = 'products'

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: {
    type: [{}],
    default: [{}]
  },
  code: String,
  stock: Number
})

export const productModel = mongoose.model(productsCollection, productSchema)