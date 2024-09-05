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
    input: 'http://localhost:7000/swagger/v1/swagger.json'
  }
};
