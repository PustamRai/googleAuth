import passport from "passport";
import { Router } from "express";

const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// callback
authRouter.get(
  "/google/callback",
  // if callback failed
  passport.authenticate("google", { failureRedirect: "/" }),

  // if success redirect back to app
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/api/auth/success`);
    console.log("Session:", req.session);
    console.log("User:", req.user);
  }

  // testing purpose
  // (req, res) => {
  //   res.send(`Login success! Welcome ${req.user.name}`);
  // }
);

// logout
authRouter.get("/logout", (req, res) => {
  req.logout((error) => {
    if (error) return res.status(500).json({ message: "Logout failed" });
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect("/");
      // res.json({ message: "Logged out successfully" });
    });
  });
});

// frontend
authRouter.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "User not authenticate" });
  }
});

export default authRouter;
