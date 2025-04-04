import rateLimit from 'express-rate-limit';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import config from '../config';

export const limiterMiddleware = rateLimit({
  windowMs: (parseInt(config.RATE_LIMIT_WINDOW_MIN as string) || 5) * 60 * 1000,
  max: parseInt(config.RATE_LIMIT_MAX_REQUESTS as string) || 50,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    const error = new AppError(
      httpStatus.TOO_MANY_REQUESTS,
      'Too many requests from this IP, please try again after 5 minutes.',
    );
    next(error);
  },
});
