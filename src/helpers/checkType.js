const checkStatusInput = (req, res, next) => {
  // New Order Details
  const {
    type,
  } = req.body;

  if (type !== (redflag || intervention)) {
    // status not valid
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'status must be either complete, new, processing, or cancelled',
      },
    });
  }
  // Call the next middleware
  return next();
};

// Export checkStatusInput
export default checkStatusInput;
