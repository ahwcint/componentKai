import { AxiosError } from 'axios';
import { API_RESPONSE_STATUS } from './requestHandler.enum';
import { BaseRequestApi, BaseResponseApi } from './requestHandler.type';
import { responseStatusTranslator } from './responseStatusHandler';

export const requestHandler =
  <T, V, E = AxiosError>(request: BaseRequestApi<T, V>) =>
  async (params?: T): BaseResponseApi<V, E> => {
    try {
      const response = await request(params);
      return { code: API_RESPONSE_STATUS.SUCCESS, data: response.data };
    } catch (err) {
      if (err instanceof AxiosError) {
        return {
          code: API_RESPONSE_STATUS.ERROR,
          error: responseStatusTranslator(err.response?.data.code, 'user') as E,
        };
      }

      return {
        code: API_RESPONSE_STATUS.ERROR,
        error: 'SOMETHING WENT WRONG' as E,
      };
    }
  };
