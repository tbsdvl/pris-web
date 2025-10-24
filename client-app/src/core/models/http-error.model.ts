export interface HttpErrorModel {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
  timestamp?: string;
}

export interface ErrorResponse {
  error: HttpErrorModel;
}

// Common error types for better type safety
export const ErrorType = {
  networkError: 'NETWORK_ERROR',
  timeoutError: 'TIMEOUT_ERROR',
  serverError: 'SERVER_ERROR',
  clientError: 'CLIENT_ERROR',
  authenticationError: 'AUTHENTICATION_ERROR',
  authorizationError: 'AUTHORIZATION_ERROR',
  validationError: 'VALIDATION_ERROR',
  notFoundError:  'NOT_FOUND_ERROR',
  rateLimitError:  'RATE_LIMIT_ERROR',
  unknownError: 'UNKNOWN_ERROR'
}