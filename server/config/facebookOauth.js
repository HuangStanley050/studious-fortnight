const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "/auth/facebook/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(false, profile);
    }
  )
);
