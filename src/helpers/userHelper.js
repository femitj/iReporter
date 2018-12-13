import Helper from '../helpers/Helper';

const checkUser = (req, res, next) => {
  const {
      email, password,
    } = req.body;

  if (!req.body.email || !req.body.password ) {
    return res.status(400).send({'message': 'Some values are missing'});
  }

  if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
  }
  
  return next();
};

export default checkUser;
