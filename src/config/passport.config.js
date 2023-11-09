import passport from "passport";
import GitHubStrategy from "passport-github2"
import local from "passport-local"
import { createHash, isValidPassword } from "../utils.js";
import { CartService, UserService } from "../services/index.js";
import logger from "../logger.js";

const LocalStrategy = local.Strategy


const initializePassport = () => {
  
  passport.use('github', new GitHubStrategy({
    clientID: 'Iv1.5e52163057bbe090',
    clientSecret: '495ed70b268f0926f573189e5bb903ac4e81c0ef',
    callbackURL: 'http://localhost:8080/api/session/githubLog'
  }, async (accesToken, refreshToken, profile, done) => {
    try {
      const user = await UserService.getUserFindOne({ email: profile._json.email })
      if (user) {
        logger.warning(`User ${username} already exist`)
        return done(null, user)
      } 
      const newUser = await UserService.createUser({
        first_name: profile._json.name,
        last_name: profile._json.name,
        age: 0,
        email: profile._json.email,
        password: " ",
        cart: await CartService.create()
      })
      if ( newUser.email == 'adminCoder@coder.com' ) {
        newUser.role = 'admin'
      }
      logger.info('A new user has been created successfully and logged in through GitHub.')
      return done(null, newUser)
    } catch(err) {
      return done(`Error to login with Github =>${err.message}`)
    }
  }))

  passport.use('register', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
  }, async(req, username, password, done) => {
    const {first_name, last_name, age, email} = req.body
    try {
      const user = await UserService.getUserFindOne({email: username})
      if (user) {
        logger.warning(`User ${username} already exist`);
        return done(null, false)
      }
      const cart = await CartService.create()
      const cartId = cart._id
      const newUser = {
        first_name, last_name, email, age, password: createHash(password), cart: cartId
      }
      if ( newUser.email == 'adminCoder@coder.com' && isValidPassword(newUser, 'admin' )) {
        newUser.role = 'admin'
      }
      
      const result = await UserService.createUser(newUser)
      logger.info('A new user has been created successfully.')
      return done(null, result)
    } catch(err) {
      return done('Error get user')
    }
  }))

  passport.use('login', new LocalStrategy({
    usernameField: 'email'
  }, async(username, password, done) => {
    try {
      const user = await UserService.getUserFindOne({ email: username })
      await CartService.updateCartUser(user)
      if(!user) {
        return done(null, false)
      }
      if (!isValidPassword(user, password)) return done(null, false)
      return done(null, user)
    } catch(err) {
      return done('Error login')
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id)
})

  passport.deserializeUser(async (id, done) => {
    const user = await UserService.getUserById(id)
    done(null, user)
  })
}

export default initializePassport