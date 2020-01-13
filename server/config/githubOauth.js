const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

passport.use(
  "github",
  new GitHubStrategy(
    {
      clientID: process.env.GIT_HUB_CLIENT_ID,
      clientSecret: process.GIT_HUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
      proxy: true
    },
    (token, tokenSecret, profile, done) => {
      return done(err, profile);
    }
  )
);
