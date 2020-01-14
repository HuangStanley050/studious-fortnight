const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "email", "name"],
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      return done(false, profile);
    }
  )
);
