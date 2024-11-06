const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implementa los controladores de eventos de Node aquí
    },
    defaultCommandTimeout: 300000, // Tiempo de espera predeterminado para los comandos en ms
    pageLoadTimeout: 300000,       // Tiempo de espera para la carga de página en ms
    video: false                   // Desactiva la grabación de video, si lo prefieres
  },
});
