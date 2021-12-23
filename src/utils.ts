export interface Response<T> {
  success: boolean;
  payload: T;
  message: string;
}
