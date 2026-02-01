/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { v4: uuidv4 } = require("uuid");

const { userModel } = require("../models/user");

passport.use(
  "local",
  new LocalStrategy(async (username, password, done) => {
    try {
      const accountData = await userModel.findByUserName(username);

      if (accountData === null || accountData == [] || !accountData) {
        return done(null, false, {
          message: "Nutzername oder Passwort inkorrekt",
        });
      }

      const matchedPassword = bcrypt.compare(password, accountData.password);

      if (!matchedPassword) {
        return done(null, false, {
          message: "Nutzername oder Passwort inkorrekt",
        });
      }
      return done(null, {
        email: accountData.email,
        userName: accountData.userName,
        firstName: accountData.firstName,
        lastName: accountData.lastName,
        userId: accountData.userId,
        role: accountData.role,
      });
    } catch (err) {
      return done(err);
    }
  }),
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CONSUMER_KEY,
      clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { sub, name, given_name, family_name, picture } = profile._json;

        let accountData = await userModel.findByGoogleId(sub);

        if (!accountData) {
          const newUuid = uuidv4();
          console.log('profileImg:', picture, typeof picture);

          accountData = await userModel.create({
            userId: newUuid,
            userName: name,
            firstName: given_name,
            lastName: family_name,
            profileImg: picture,
            google: JSON.stringify({ id: sub, displayName: name }),
          });
        }

        return done(null, accountData);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (userId, done) => {
  const foundUser = await userModel.find(userId);
  done(null, {
    email: foundUser.email,
    userName: foundUser.userName,
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
    userId: foundUser.userId,
    profileImg: foundUser.profileImg,
  });
});

module.exports = passport;
