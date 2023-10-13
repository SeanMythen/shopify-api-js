/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as AdminTypes from './admin.types';

export type TestQueryQueryVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID'];
}>;


export type TestQueryQuery = { shop: Pick<AdminTypes.Shop, 'name'>, product?: AdminTypes.Maybe<Pick<AdminTypes.Product, 'title'>> };

export type PopulateProductMutationVariables = AdminTypes.Exact<{
  input: AdminTypes.ProductInput;
}>;


export type PopulateProductMutation = { productCreate?: AdminTypes.Maybe<{ product?: AdminTypes.Maybe<(
      Pick<AdminTypes.Product, 'id' | 'title' | 'handle' | 'status'>
      & { variants: { edges: Array<{ node: Pick<AdminTypes.ProductVariant, 'id' | 'price' | 'barcode' | 'createdAt'> }> } }
    )> }> };

interface GeneratedQueryTypes {
  "\n    query testQuery($id: ID!) {\n      shop {\n        name\n      }\n\n      product(id: $id) {\n        title\n      }\n    }\n  ": {return: TestQueryQuery, variables: TestQueryQueryVariables},
}

interface GeneratedMutationTypes {
  "\n    mutation populateProduct($input: ProductInput!) {\n      productCreate(input: $input) {\n        product {\n          id\n          title\n          handle\n          status\n          variants(first: 10) {\n            edges {\n              node {\n                id\n                price\n                barcode\n                createdAt\n              }\n            }\n          }\n        }\n      }\n    }\n  ": {return: PopulateProductMutation, variables: PopulateProductMutationVariables},
}

declare module '@shopify/shopify-api' {
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
