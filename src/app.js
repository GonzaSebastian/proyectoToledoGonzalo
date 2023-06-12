import express from "express"
import productRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/carts.routes.js"
import viewsRouter from "./routes/views.router.js"
import handlebars from "express-handlebars"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.use('/products', viewsRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartsRouter)


app.listen(PORT, () => console.log(`Server Up ${PORT}`))
