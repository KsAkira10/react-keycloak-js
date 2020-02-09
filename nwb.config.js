module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactKeycloak',
      externals: {
        react: 'React'
      }
    }
  }
}
