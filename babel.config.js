// babel.config.js

  module.exports = {
    plugins: ['@babel/plugin-proposal-private-property-in-object'],    
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript',
      'react-app',
    ],
  };
  