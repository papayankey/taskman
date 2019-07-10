function authenticate(req, res, next) {
  if (req.session.user) {
    return next();
  }

  res.redirect("/user/signup");
}

module.exports = authenticate;
