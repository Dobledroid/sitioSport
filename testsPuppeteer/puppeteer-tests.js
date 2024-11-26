const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Cambiar a true para pruebas invisibles
  const page = await browser.newPage();

  try {
    console.log('Iniciando pruebas...');

    // Navegar a la aplicación
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

    // Verificar que el componente principal está presente
    const rutasExists = await page.$('div[style*="height: 100vh"]');
    if (!rutasExists) throw new Error('El componente principal no se renderizó correctamente.');
    console.log('✅ El componente principal se renderizó correctamente.');

    // Simular cambio de conexión a internet: desconectar
    console.log('Simulando desconexión...');
    await page.setOfflineMode(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo
    const toastErrorExists = await page.evaluate(() => {
      const xpath = "//div[contains(text(), 'Se perdió la conexión a internet')]";
      const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
      return result.singleNodeValue !== null;
    });
    if (!toastErrorExists) throw new Error('El Toast de conexión perdida no apareció.');
    console.log('✅ Toast de conexión perdida verificado.');

    // Simular reconexión y verificar el Toast
    console.log('Simulando reconexión...');
    await page.setOfflineMode(false);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo
    const toastSuccessExists = await page.evaluate(() => {
      const xpath = "//div[contains(text(), 'Conexión a internet restaurada')]";
      const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
      return result.singleNodeValue !== null;
    });
    if (!toastSuccessExists) throw new Error('El Toast de conexión restaurada no apareció.');
    console.log('✅ Toast de conexión restaurada verificado.');

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
  } finally {
    await browser.close();
    console.log('Pruebas finalizadas.');
  }
})();
