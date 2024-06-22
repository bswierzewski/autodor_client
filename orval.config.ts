module.exports = {
  autodor: {
    output: {
      target: './src/lib/api/autodor.ts',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/lib/api/custom-instance.ts',
          name: 'customInstance'
        }
      }
    },
    input: './docs/autodor.yaml'
  }
};
