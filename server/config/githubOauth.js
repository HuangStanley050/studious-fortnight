const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;

passport.use(
  "github",
  new GithubStrategy(
    {
      consumerKey: process.env.TWITTER_API,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: "/auth/github/callback",
      proxy: true
    },
    (token, tokenSecret, profile, done) => {
      console.log(profile);
      return done(err, profile);
    }
  )
);
