import type {CodegenConfig} from '@graphql-codegen/cli';
import {preset, pluckConfig} from '@shopify/hydrogen-codegen';

const interfaceExtension = `
declare module '@shopify/shopify-api' {
  interface AdminQueries extends %%QUERY%% {}
  interface AdminMutations extends %%MUTATION%% {}
}`;

export default {
  overwrite: true,
  pluckConfig,
  generates: {
    './.cache/admin.schema.json': {
      schema: 'https://shopify.dev/admin-graphql-direct-proxy',
      plugins: ['introspection'],
    },
    './codegen/admin.types.ts': {
      schema: './.cache/admin.schema.json',
      plugins: ['typescript'],
    },
    './codegen/admin.generated.d.ts': {
      schema: './.cache/admin.schema.json',
      preset,
      documents: ['*.{ts,tsx}', './**/*.{ts,tsx}'],
      presetConfig: {
        importTypesFrom: './admin.types',
        namespacedImportName: 'AdminTypes',
        interfaceExtension: ({
          queryType,
          mutationType,
        }: {
          queryType: string;
          mutationType: string;
        }) =>
          interfaceExtension
            .replace('%%QUERY%%', queryType)
            .replace('%%MUTATION%%', mutationType),
      },
    },
  },
} as CodegenConfig;
