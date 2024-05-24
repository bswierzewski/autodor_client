module.exports = {
  mtparts: {
    output: {
      target: './src/lib/api/mtparts.ts',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/lib/api/custom-instance.ts',
          name: 'customInstance'
        }
      }
    },
    input: './docs/mtparts.yaml'
  }
};
