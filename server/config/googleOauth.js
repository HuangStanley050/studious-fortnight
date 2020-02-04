const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const badges = require("../hardcoded_data/badges");

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const externalProvider = profile.provider;
      try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          if (!existingUser.activeUser) {
            const user = {
              deactivated: true
            };
            return done(null, user);
          }
          const { email, id } = existingUser;
          const user = {
            email,
            id
          };
          return done(null, user);
        }

        let newUser = await new User({
          email,
          externalProvider,
          badges
        }).save();
        newUser = {
          email: newUser.email,
          id: newUser.id,
          externalProvider: newUser.externalProvider
        };
        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
