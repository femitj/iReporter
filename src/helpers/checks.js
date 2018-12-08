const checkLocation = (req, res, next) => {
    const {
      location,
    } = req.body;
    
    if (location === '' || location === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'pls input location',
      })
    }
    return next();
  };
  
  export default checkLocation;