import express from "express"
import productRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/carts.routes.js"
import viewsRouter from "./routes/views.router.js"
import sessionsRouter from "./routes/sessions.routes.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import mongoose from "mongoose"
import session from "express-session";
import MongoStore from "connect-mongo"
import __dirname from "./utils.js"
import passport from "passport"
import initializePassport from "./config/passport.config.js"

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

app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://coder:coder@cluster0.dx5fecx.mongodb.net/', 
    dbName: 'dbToledo',
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }),
  secret: 'appCoder ',
  resave: true,
  saveUninitialized: true
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/products', viewsRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartsRouter)
app.use('/session', sessionsRouter)


io.on('connection', socket  => {
  console.log("New client connected");
  socket.on('productList', data => {
    io.emit('updateProducts', data.payload)
  })
})


