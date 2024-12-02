const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // Cambiar a false para ver el navegador en acción
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // Evitar problemas de permisos
  });

  const page = await browser.newPage();

  try {
    console.log('Navegando a la página...');
    await page.goto('http://localhost:3000/tienda', {
      timeout: 60000,
      waitUntil: 'networkidle0', // Espera hasta que no haya más de 0 conexiones de red
    });

    console.log('Página cargada. Imprimiendo el contenido...');
    const content = await page.content();
    console.log(content); // Muestra el HTML de la página

    console.log('Esperando el selector .productos...');
    await page.waitForSelector('.productos', { timeout: 60000 });
    console.log('Selector .productos encontrado.');

    // Captura de pantalla para verificar el estado visual de la página
    await page.screenshot({ path: 'debug_screenshot.png', fullPage: true });
    console.log('Captura de pantalla guardada como debug_screenshot.png.');

    // Aquí puedes agregar interacciones y validaciones
  } catch (error) {
    console.error('Error cargando la página o encontrando el selector:', error);
  } finally {
    await browser.close();
    console.log('Navegador cerrado.');
  }
})();
