import '../adapters/node';

import {ApiVersion, Session, shopifyApi} from '../lib/index';
import {graphql} from '../build/graphql';

async function test() {
  // Usual library usage
  const shopify = shopifyApi({
    apiKey: 'test',
    apiSecretKey: 'test',
    apiVersion: '2021-04' as ApiVersion,
    hostName: 'localhost:1234',
    scopes: ['aaa'],
    isEmbeddedApp: true,
  });

  // Same client constructor as usual
  const client = new shopify.clients.Graphql({
    session: new Session({
      id: 'test',
      isOnline: false,
      shop: 'paulos-test-app-store.myshopify.com',
      accessToken: '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',
      state: '1234',
    }),
  });

  // const query = graphql(/* GraphQL */ `
  //   query testQuery {
  //     shop {
  //       name
  //     }
  //   }
  // `);
  // const response = await client.query({data: {query}});
  // console.log(response.body.data.shop.name);

  const mutation = graphql(/* GraphQL */ `
    mutation populateProduct($input: ProductInput!) {
      productCreate(input: $input) {
        product {
          id
          title
          handle
          status
          variants(first: 10) {
            edges {
              node {
                id
                price
                barcode
                createdAt
              }
            }
          }
        }
      }
    }
  `);
  const response = await client.query({
    data: {
      query: mutation,
      variables: {
        input: {
          title: `Red Snowboard`,
          variants: [{price: Math.random() * 100}],
        },
      },
    },
  });
  console.log(response.body.data.productCreate?.product?.title);
}

test();
