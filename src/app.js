import express from "express"
import productRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/carts.routes.js"
import viewsRouter from "./routes/views.router.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"

const app = express()
const PORT = 8080

const serverHTTP = app.listen(PORT, () => console.log(`Server Up ${PORT}`))
const io = new Server(serverHTTP)

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


io.on('connection', () => {
  console.log("New client connected");
})
