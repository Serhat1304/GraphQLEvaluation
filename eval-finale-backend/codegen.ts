import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/typeDefs.ts',
  generates: {
    './src/types/generated.ts': {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: './context#DataSourceContext',
        mappers: {},
      },
    },
  },
};

export default config;
