const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { spawn } = require('child_process');

(async () => {
  try {
    console.log('Ejecutando todos los tests de Puppeteer...');

    // Configuración de Puppeteer para garantizar el modo headless
    const browser = await puppeteer.launch({
      headless: true, // Ejecutar sin interfaz gráfica
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Opciones para entornos CI/CD
    });

    const testDir = path.resolve(__dirname);
    const files = fs.readdirSync(testDir).filter(file => file.endsWith('.js') && file !== 'runner.js'); // Excluir runner.js

    for (const file of files) {
      const filePath = path.join(testDir, file);
      console.log(`Ejecutando test: ${filePath}`);

      await new Promise((resolve, reject) => {
        const process = spawn('node', [filePath], { stdio: 'inherit' });

        process.on('close', (code) => {
          if (code !== 0) {
            console.error(`❌ Test falló: ${file}`);
            reject(new Error(`Test falló con código ${code}`));
          } else {
            console.log(`✅ Test completado: ${file}`);
            resolve();
          }
        });
      });
    }

    console.log('✅ Todos los tests completados.');
    await browser.close(); // Cierra el navegador después de que se completen los tests
  } catch (error) {
    console.error('❌ Error al ejecutar los tests:', error.message);
  }
})();
