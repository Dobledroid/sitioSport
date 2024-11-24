// babel.config.js

module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
    'react-app',
  ], 
  plugins: ['@babel/plugin-proposal-private-property-in-object'],

};
