export type TBaseResponse<T> = {
  message: string;
  status: StatusEnum;
  data: T;
};

export enum StatusEnum {
  SUCCESS = 'success',
  FAILURE = 'failure',
}
