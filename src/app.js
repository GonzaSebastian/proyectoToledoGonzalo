import express from "express"
import productRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/carts.routes.js"
import viewsRouter from "./routes/views.router.js"
import sessionsRouter from "./routes/sessions.routes.js"
import mockingRouter from "./routes/mocking.routes.js"
import loggerTestRouter from "./routes/logger.routes.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import { socketConnection } from "./socketConnection.js"
import mongoose from "mongoose"
import session from "express-session";
import MongoStore from "connect-mongo"
import __dirname from "./utils.js"
import passport from "passport"
import initializePassport from "./config/passport.config.js"
import { PORT, MONGO_URI, MONGO_DB_NAME, SECRET_PASS } from "./config/config.js"
import errorMidleware from "./middlewares/error.midleware.js"
import logger from "./logger.js"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUiExpress from 'swagger-ui-express'

const app = express()

export let io = undefined
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
  serverHTTP = app.listen(PORT, () => logger.info(`Server Up ${PORT}`))
  io = new Server(serverHTTP)
} catch(err) {
  logger.error(err);
}

// CONFIG SWAGGER
const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentation for backend project Toledos API',
      description: 'Aqui va la descripcion'
    }
  },
  apis: ['./docs/**/*.yaml']
}
const specs = swaggerJSDoc(swaggerOptions)
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

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
app.use('/api/mockingproducts', mockingRouter)

app.use('/api/loggerTest', loggerTestRouter)


// ERROR MIDLEWARE
app.use(errorMidleware)

// SOCKET CONNECTION
if (serverHTTP){
  socketConnection()
}



