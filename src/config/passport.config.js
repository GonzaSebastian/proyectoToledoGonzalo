import passport from "passport";
import GitHubStrategy from "passport-github2"
import local from "passport-local"
import UserModel from "../models/user.model.js"
import { createHash, isValidPassword } from "../utils.js";
import bcrypt from 'bcrypt'

const LocalStrategy = local.Strategy


const initializePassport = () => {
  
  passport.use('github', new GitHubStrategy({
    clientID: 'Iv1.5e52163057bbe090',
    clientSecret: '495ed70b268f0926f573189e5bb903ac4e81c0ef',
    callbackURL: 'http://localhost:8080/session/githubLog'
  }, async (accesToken, refreshToken, profile, done) => {
    console.log(profile);
    try {
      const user = await UserModel.findOne({ email: profile._json.email })
      if (user) return done(null, user)
      const newUser = await UserModel.create({
        first_name: profile._json.name,
        last_name: profile._json.name,
        age: 0,
        email: profile._json.email,
        password: " ",
      })
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
      const user = await UserModel.findOne({email: username})
      if (user) {
        console.log('User already exist');
        return done(null, false)
      }
      const newUser = {
        first_name, last_name, email, age, password: createHash(password)
      }
      if ( newUser.email == 'adminCoder@coder.com' && isValidPassword(newUser, 'admin' )) {
        newUser.role = 'admin'
      }
      
      const result = await UserModel.create(newUser)
      return done(null, result)
    } catch(err) {
      return done('Error get user')
    }
  }))

  passport.use('login', new LocalStrategy({
    usernameField: 'email'
  }, async(username, password, done) => {
    try {
      const user = await UserModel.findOne({ email: username })
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
    const user = await UserModel.findById(id)
    done(null, user)
  })
}

export default initializePassport