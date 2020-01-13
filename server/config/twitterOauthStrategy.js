const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;

passport.use(
  "twitter",
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_API,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: "/auth/twitter/callback",
      proxy: true
    },
    (token, tokenSecret, profile, done) => {
      console.log(profile);
      return done(err, profile);
    }
  )
);
