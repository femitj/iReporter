const checkCommentInput = (req, res, next) => {
  const {
    comment,
  } = req.body;

  if (comment === '' || comment === null || comment === undefined) {
    return res.status(400).json({
      status: 400,
      error: 'comment cannot be empty',
    });
  }
  return next();
};

export default checkCommentInput;
