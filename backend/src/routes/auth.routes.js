import passport from "passport";
import { Router } from "express";

const userRouter = Router();

userRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// callback
userRouter.get(
  "/google/callback",
  // if callback failed
  passport.authenticate("google", { failureRedirect: "/" }),

  // if success redirect back to app
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URI}/api/auth/success`);
    console.log('Session:', req.session);
    console.log('User:', req.user);
  }

  // testing purpose
  // (req, res) => {
  //   res.send(`Login success! Welcome ${req.user.name}`);
  // }
);

// logout
userRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send("logout failed");
    res.redirect(process.env.CLIENT_URI);
  });
});

// frontend
userRouter.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "User not authenticate" });
  }
});

export default userRouter
