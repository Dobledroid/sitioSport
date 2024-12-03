const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  try {
    console.log('Iniciando prueba de Registro...');

    // --- Prueba de Registro ---
    console.log('Realizando prueba de Registro...');
    await page.goto('http://localhost:3000/registro', { waitUntil: 'domcontentloaded' });

    // Generar correo único
    const timestamp = Date.now();
    const email = `carlitosprueba${timestamp}@gmail.com`;
    
    // Llenar el formulario de registro
    await page.type('#yourName', 'Juan');
    await page.type('#ApePat', 'Péreeez');
    await page.type('#ApeMat', 'González');
    await page.type('#yourEmail', email); // Correo único
    await page.type('#yourPassword', 'Password123!');
    await page.type('#PasswordConfirm', 'Password123!');
    await page.click('#aceptarTerminos');
    await page.click('button[type="submit"]');
    await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar 2 segundos para procesar

    // Validar existencia de un mensaje de error en la alerta
    const currentUrl = await page.url();
    if (currentUrl.includes('http://localhost:3000/login')) {
      console.log('✅ Registro exitoso y redirigido a login.');
    } else {
      console.log('❌ Error en el registro o redirección no exitosa.');
    }

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
  } finally {
    await browser.close();
    console.log('Prueba finalizada.');
  }
})();
