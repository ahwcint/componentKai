import { AxiosError, AxiosResponse } from 'axios';
import { API_RESPONSE_STATUS } from './requestHandler.enum';

export type SuccessResponse<V> = {
  code: API_RESPONSE_STATUS.SUCCESS;
  data: V;
};

export type ErrorResponse<E = AxiosError> = {
  code: API_RESPONSE_STATUS.ERROR;
  error: E;
};

export type BaseRequestApi<T, V, P = Promise<AxiosResponse<V>>> = (
  params?: T,
) => P;

export type BaseResponseApi<V, E> = Promise<
  SuccessResponse<V> | ErrorResponse<E>
>;
