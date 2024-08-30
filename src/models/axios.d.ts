import { AxiosError, AxiosResponse } from 'axios';

type TApiResponse<T> = Promise<
    AxiosResponse<T>
>;

export type { TApiResponse };