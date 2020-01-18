const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");

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
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const externalProvider = profile.provider;
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          const { email } = existingUser;
          const user = {
            email
          };
          return done(null, user);
        }

        let newUser = await new User({
          email,
          externalProvider
        }).save();
      } catch (err) {
        return done(null, newUser);
      }
    }
  )
);
