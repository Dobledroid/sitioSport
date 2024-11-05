// jest.config.js
module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',   // Transpila archivos .js y .jsx con Babel
      '^.+\\.tsx?$': 'babel-jest',   // Transpila archivos .ts y .tsx si usas TypeScript
    },
    transformIgnorePatterns: [
      '/node_modules/',              // Ignora node_modules, salvo que tengas dependencias de ES6
    ],
  };
  