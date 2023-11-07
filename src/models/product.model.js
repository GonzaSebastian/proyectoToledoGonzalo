import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

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
  stock: Number,
  status: {
    type: Boolean,
    default: true
  },
  owner: { type: String, require: true, default: 'admin', ref: 'users'}
})
productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model('products', productSchema)