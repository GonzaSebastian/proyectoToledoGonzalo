import express from "express"
import productManager from "./controllers/productManager.js"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const product = new productManager("./src/models/products.json")

app.post("/products", async (req, res) => {
  let newProduct = req.body

  res.send(await product.addProduct(newProduct))
})

app.get("/products", async (req, res) => {
  const getProducts = await product.getProducts()
  res.send(getProducts)
})

app.get("/products/:id", async (req, res) => {
  let id = req.params.id
  res.send(await product.getProductById(id))
})

app.put("/products/:id", async (req, res) => {
  let id = req.params.id
  let update = req.body
  res.send(await product.updateProduct(id, update))
})

app.delete("/products/:id", async (req, res) => {
  let id = req.params.id
  res.send(await product.deleteProduct(id))
})

app.listen(PORT, () => console.log(`Server Up ${PORT}`))
