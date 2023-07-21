import express from "express"
import productRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/carts.routes.js"
import viewsRouter from "./routes/views.router.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import mongoose from "mongoose"

const app = express()
const PORT = 8080
let io = undefined
let serverHTTP = undefined

try {
  await mongoose.connect('mongodb+srv://coder:coder@cluster0.dx5fecx.mongodb.net/dbToledo')
  serverHTTP = app.listen(PORT, () => console.log(`Server Up ${PORT}`))
  io = new Server(serverHTTP)

} catch(err) {
  console.log(err);
}


app.use((req, res, next) => {
  req.io = io 
  next()
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('./src/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.use('/products', viewsRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartsRouter)


io.on('connection', socket  => {
  console.log("New client connected");
  socket.on('productList', data => {
    io.emit('updateProducts', data.payload)
  })
})


