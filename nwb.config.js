const path = require('path');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactKeycloak',
      externals: {
        react: 'React',
        'keycloak-js': 'Keycloak',
        'react-router': 'ReactRouter'
      }
    }
  },
  webpack: {
    aliases: {
      '@react-keycloak/web': path.resolve('src')
    },
    html: {
      mountId: 'root',
      title: 'React with OIDC'
    },
    define: {
      __VERSION__: JSON.stringify(require('./package.json').version),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }
};
