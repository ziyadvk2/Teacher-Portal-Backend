import passport from 'passport';

const ensureAuthentication = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const userData = user.toObject ? user.toObject() : user;
    delete userData.password;
    req.user = userData;
    next();
  })(req, res, next);
};

export default ensureAuthentication;
