// babel.config.js
module.exports = {    
  plugins: ['babel-plugin-react-html-attrs'],
    presets: [
      '@babel/preset-env',         // Para soporte de sintaxis moderna de ECMAScript
      '@babel/preset-react',       // Para JSX (React)
      '@babel/preset-typescript'   // Si estás usando TypeScript
    ],
  };