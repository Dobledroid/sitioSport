const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('Iniciando prueba de Registro...');

    // --- Prueba de Registro ---
    console.log('Realizando prueba de Registro...');
    await page.goto('http://localhost:3000/registro', { waitUntil: 'domcontentloaded' });

    // Generar correo único
    const email = `juanH.perez${Date.now()}@example.com`;

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

    // Validar mensaje de éxito o redirección
    const successMessage = await page.evaluate(() => {
      const message = document.querySelector('.alert-success'); // Cambia el selector según el mensaje de éxito
      return message ? message.textContent.includes('Usuario registrado exitosamente') : false;
    });

    if (!successMessage) {
      await page.waitForSelector('#email', { timeout: 5000 });
    }

    console.log('✅ Registro completado con éxito.');

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
  } finally {
    await browser.close();
    console.log('Prueba finalizada.');
  }
})();
