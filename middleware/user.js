let user = (req, res, next) => {
    if (req.session.passport.user === undefined) 
      return res.json({
        isUserAuth: false,
        error: true
      });

      next();
  };
  
  module.exports = { user };