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
  }
})
productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model('products', productSchema)