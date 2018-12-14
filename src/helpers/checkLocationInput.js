const checkLocationInput = (req, res, next) => {
  // New Order Details
  const {
    location,
  } = req.body;

  if (location === '' || location === null || location === undefined) {
    return res.status(400).json({
      status: 400,
      error: 'location cannot be empty',
    });
  }
  return next();
};

export default checkLocationInput;
