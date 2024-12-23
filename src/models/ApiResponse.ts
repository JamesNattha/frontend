export interface ApiResponse<T> {
  isStatus: boolean;
  data: T | null;
  message: string;
}
