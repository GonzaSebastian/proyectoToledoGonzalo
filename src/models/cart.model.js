import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {type: String},
  products: {
    type: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        _id: false
      },
      quantity: Number
    }],
    default: []
  }
})
cartSchema.pre('findById', function() {
  this.populate('products.product')
})

export const cartModel = mongoose.model('carts', cartSchema)