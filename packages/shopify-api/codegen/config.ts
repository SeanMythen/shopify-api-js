import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  documents: ['app/**/*.ts(x)?', 'app/**/*.graphql'],
  ignoreNoDocuments: true,
  schema: [
    {
      'https://shopify.dev/admin-graphql-direct-proxy': {},
    },
  ],
  generates: {
    './build/graphql/': {
      preset: 'client',
      // See https://the-guild.dev/graphql/codegen/plugins/typescript/typescript
      config: {
        // addUnderscoreToArgsType: true,
      },
    },
  },
};

export default config;
