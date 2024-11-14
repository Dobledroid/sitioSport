
describe('Prueba E2E de toda la aplicación', () => {
    // Visita la página principal
    it('Debería cargar la página principal y verificar el contenido', () => {
      cy.visit('http://localhost:3000');
      cy.contains('Bienvenido'); // Cambia 'Bienvenido' a algún texto que esté en tu página principal
    });
  
    // Navegación a diferentes secciones
    it('Debería navegar a la sección "Acerca de"', () => {
      cy.get('.menu-about').click(); // Cambia '.menu-about' al selector real de tu enlace o botón
      cy.url().should('include', '/about'); // Verifica que la URL incluya '/about'
      cy.contains('Acerca de Nosotros'); // Cambia a algún texto en la página de "Acerca de"
    });
  
    it('Debería navegar a la sección "Contacto" y enviar un formulario', () => {
      cy.get('.menu-contact').click(); // Selector del enlace de "Contacto"
      cy.url().should('include', '/contact');
      cy.get('#nombre').type('Juan Pérez'); // Completa el campo de nombre
      cy.get('#correo').type('juan@example.com'); // Completa el campo de correo
      cy.get('#mensaje').type('Este es un mensaje de prueba.'); // Completa el campo de mensaje
      cy.get('.boton-enviar').click(); // Haz clic en el botón de enviar
      cy.contains('Gracias por tu mensaje'); // Verifica que aparece un mensaje de éxito
    });
  
    // Cierre de sesión o finalización
    it('Debería permitir cerrar sesión correctamente', () => {
      cy.get('.menu-logout').click(); // Selector del botón de cierre de sesión
      cy.url().should('include', '/login'); // Verifica que redirige a la página de login
      cy.contains('Iniciar sesión'); // Verifica que la página de login esté visible
    });
  });
  