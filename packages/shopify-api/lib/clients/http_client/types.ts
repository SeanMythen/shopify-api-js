import {Method} from '@shopify/network';

import {Headers} from '../../../runtime/http';

export interface AdminQueries {
  [key: string]: {return: any; variables?: any};
}

export interface AdminMutations {
  [key: string]: {return: any; variables?: any};
}

type AdminOperations = AdminQueries & AdminMutations;

type OperationRequest<
  OperationQueries extends AdminOperations,
  T extends keyof OperationQueries,
> = OperationQueries[T]['variables'] extends {[key: string]: never}
  ? {query: T; variables?: never}
  : {
      query: T;
      variables: {
        [k in keyof OperationQueries[T]['variables']]: 'input' extends keyof OperationQueries[T]['variables'][k]
          ? OperationQueries[T]['variables'][k]['input']
          : OperationQueries[T]['variables'][k];
      };
    };

export type RequestData<T> = T extends keyof AdminOperations
  ? OperationRequest<AdminOperations, T>
  : {[key: string]: unknown} | string;

export type ReturnBody<T> = T extends keyof AdminOperations
  ? {data: AdminOperations[T]['return']}
  : any;

export interface HeaderParams {
  [key: string]: string | number | string[];
}

/* eslint-disable @shopify/typescript/prefer-pascal-case-enums */
export enum DataType {
  JSON = 'application/json',
  GraphQL = 'application/graphql',
  URLEncoded = 'application/x-www-form-urlencoded',
}
/* eslint-enable @shopify/typescript/prefer-pascal-case-enums */

export type QueryParams =
  | string
  | number
  | string[]
  | number[]
  | {[key: string]: QueryParams};

export interface GetRequestParams<T = any> {
  path: string;
  type?: DataType;
  data?: RequestData<T>;
  query?: {[key: string]: QueryParams};
  extraHeaders?: HeaderParams;
  tries?: number;
}

export type PostRequestParams<T = any> = GetRequestParams<T> & {
  data: RequestData<T>;
};

export type PutRequestParams<T = any> = PostRequestParams<T>;

export type DeleteRequestParams<T = any> = GetRequestParams<T>;

export type RequestParams<T = any> = (
  | GetRequestParams<T>
  | PostRequestParams<T>
) & {
  method: Method;
};

export interface RequestReturn<T = any> {
  body: ReturnBody<T>;
  headers: Headers;
}
