const webpack = require('webpack');
const { parsed } = require('dotenv').config({
  path: `${process.cwd()}/demo/.env`
});

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactKeycloak',
      externals: {
        react: 'React',
        'keycloak-js': 'Keycloak'
      }
    }
  },
  webpack: {
    extra: {
      plugins: [
        new webpack.EnvironmentPlugin({
          ...parsed
        })
      ]
    }
  }
};
