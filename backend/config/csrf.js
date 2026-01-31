const { csrfSync } = require("csrf-sync");

const { generateToken, revokeToken, csrfSynchronisedProtection } = csrfSync({
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],
  getTokenFromState: (req) => req.session.csrfToken,
  getTokenFromRequest: (req) => req.headers["x-csrf-token"],
  storeTokenInState: (req, token) => {
    req.session.csrfToken = token;
  },
  size: 128,
});

module.exports = {
  generateToken,
  csrfSynchronisedProtection,
  revokeToken,
};
