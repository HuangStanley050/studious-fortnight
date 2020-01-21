const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const externalProvider = profile.provider;
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          const { email, id } = existingUser;
          const user = {
            email,
            id
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
