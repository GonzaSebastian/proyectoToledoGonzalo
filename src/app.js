import express from "express"
import productManager from "./controllers/productManager.js"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const product = new productManager("./src/models/products.json")

app.post("/product", async (req, res) => {
  let newProduct = req.body

  res.json(await product.writeProduct(newProduct))
})

// app.get("/products", async (req, res) => {
//   const getProducts = await product.getProducts()
//   res.send(getProducts)
// })

app.listen(PORT, () => console.log(`Server Up ${PORT}`))
