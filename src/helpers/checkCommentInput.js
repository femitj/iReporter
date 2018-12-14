const checkCommentInput = (req, res, next) => {
  const {
    comments,
  } = req.body;

  if (comments === '' || comments === null || comments === undefined) {
    return res.status(400).json({
      status: 400,
      error: 'comment cannot be empty',
    });
  }
  return next();
};

export default checkCommentInput;
