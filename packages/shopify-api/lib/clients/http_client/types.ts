import type {
  ResultOf,
  TypedDocumentNode,
  VariablesOf,
} from '@graphql-typed-document-node/core';
import {Method} from '@shopify/network';

import {Headers} from '../../../runtime/http';

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

export type RequestData<T> = T extends TypedDocumentNode<
  infer _TResult,
  infer TVariables
>
  ? {query: T; variables?: TVariables}
  : {[key: string]: unknown} | string;

export type ReturnBody<T> = T extends TypedDocumentNode<
  ResultOf<T>,
  VariablesOf<T>
>
  ? {data: ResultOf<T>}
  : any;

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
