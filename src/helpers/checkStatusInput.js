const checkStatusInput = (req, res, next) => {
  // New Order Details
  const {
    status,
  } = req.body;

  if ((status !== 'draft') && (status !== 'under investigation') && (status !== 'resolved') && (status !== 'rejected')) {
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
