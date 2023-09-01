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
import { PORT, MONGO_URI, MONGO_DB_NAME, SECRET_PASS } from "./config/config.js"

const app = express()
let io = undefined
let serverHTTP = undefined

app.use((req, res, next) => {
  req.io = io 
  next()
})

// EXPRESS
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname + '/public'))

// MONGOOSE CONECTION
try {
  await mongoose.connect(`${MONGO_URI}${MONGO_DB_NAME}`)
  serverHTTP = app.listen(PORT, () => console.log(`Server Up ${PORT}`))
  io = new Server(serverHTTP)

} catch(err) {
  console.log(err);
}

// CONFIG SESSIONS
app.use(session({
  store: MongoStore.create({
    mongoUrl: `${MONGO_URI}`, 
    dbName: `${MONGO_DB_NAME}`,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }),
  secret: `${SECRET_PASS}`,
  resave: true,
  saveUninitialized: true
}))

// PASSPORT
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// CONFIG HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// API ROUTER
app.use('/products', viewsRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartsRouter)
app.use('/api/session', sessionsRouter)


// SOCKET CONECTION
io.on('connection', socket  => {
  console.log("New client connected");
  socket.on('productList', data => {
    io.emit('updateProducts', data.docs)
  })
})


