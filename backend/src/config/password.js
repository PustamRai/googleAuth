import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserAuth } from "../models/userAuth.models.js";
import dotenv from "dotenv"

dotenv.config()

passport.use(
  new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,

      // for localhost
      callbackURL: process.env.GOOGLE_CALLBACK_URL, 
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserAuth.findOne({ googleId: profile.id });

        if (!user) {
          user = await UserAuth.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          });
        }

        return done(null, user); // triggers serializeUser
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// what minimal data needs to be stored
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user._id);
  done(null, user._id);
});

// uses to retrieve the complete user object
passport.deserializeUser(async (id, done) => {
  console.log("Deserializing user:", id);
  try {
    const user = await UserAuth.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport
