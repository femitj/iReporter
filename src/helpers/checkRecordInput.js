const checkRecordInput = (req, res, next) => {
  // User details
  const {
    location,
    comments,
  } = req.body;
  if (location === '' || location === null || location === undefined) {
    // Price field empty
    return res.status(400).json({
      status: 400,
      error: 'location cannot be empty',
    });
  }
  if (comment === '' || comment === null || comment === undefined) {
    // Location field empty
    return res.status(400).json({
      status: 400,
      error: 'comment cannot be empty',
    });
  }


  // Call the next middleware
  return next();
};

// Export checkSignUpInput
export default checkRecordInput;
