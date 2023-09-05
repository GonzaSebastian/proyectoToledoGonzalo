import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  code: {type: String, require: true, unique: true},
  purchase_date: {type: String, default: Date.now, require: true},
  amount: {type: Number, require: true},
  purchaser: {type: String, require: true},
  products: {
    type: [
      {
        _id: false,
        product: {
          type:mongoose.Schema.Types.ObjectId,
          ref: "products"
        },
        quantity: Number,
      }
    ],
    default: []
  }
});

ticketSchema.pre('findOne', function() {
  this.populate('products.product')
})

mongoose.set("strictQuery", false)
const ticketModel = mongoose.model("ticket", ticketSchema)

export default ticketModel