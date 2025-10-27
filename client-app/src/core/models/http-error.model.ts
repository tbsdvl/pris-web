export interface HttpErrorModel {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
  timestamp?: string;
}