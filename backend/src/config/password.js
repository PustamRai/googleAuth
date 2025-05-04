import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.models.js";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGlE_CLIENT_ID,
    clientSecret: process.env.GOOGlE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id})

        if(!user) {
            user = await User.create({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            })
        }

        return done(null, user)
    } catch (error) {
        return done(error, null)
    }
}))

// what minimal data needs to be stored
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// uses to retrieve the complete user object
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
})
