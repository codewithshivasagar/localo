export interface ErrorResponse {
  success: false;
  message: string;
  error: string;
  statusCode: number;
  path: string;
  timestamp: string;
  details?: unknown;
}
