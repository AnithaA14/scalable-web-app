const errorHandler = (error, req, res, next) => {
  console.error('Error:', error);
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';

  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(error.errors).map(err => err.message).join(', ');
  }
  if (error.code === 11000) {
    statusCode = 400;
    const field = Object.keys(error.keyPattern)[0];
    message = `${field} already exists`;
  }

  res.status(statusCode).json({ success: false, message });
};

export default errorHandler;