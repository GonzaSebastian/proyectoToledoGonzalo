import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productsCollection = 'products'

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: Number,
  thumbnail: {
    type: [String],
    default: []
  },
  code: String,
  stock: Number
})
productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model(productsCollection, productSchema)