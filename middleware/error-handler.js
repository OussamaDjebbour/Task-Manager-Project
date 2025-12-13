import { CustomAPIError } from '../errors/custom-error.js';

const errorhandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res
    .status(500)
    .json({ msg: 'Something went wrong. Please try again' });
};

export default errorhandlerMiddleware;
