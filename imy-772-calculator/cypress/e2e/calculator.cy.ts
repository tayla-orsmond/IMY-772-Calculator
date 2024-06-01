describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // General
  it('should have the correct title', () => {
    cy.title().should('eq', 'IMY-772-Calculator');
  });

  it('should have the correct heading', () => {
    cy.get('h1').should('contain', 'Hexadecimal Calculator');
  });

  // Calculator
  it('should have a calculator, screen and keyboard', () => {
    cy.get('.calculator').should('exist');
    cy.get('.screen').should('exist');
    cy.get('.keyboard').should('exist');
  });

  it('should initally display 0 on the screen', () => {
    cy.get('.equation-display').should('contain', '0');
    cy.get('.last-equation-display').should('contain', 'Ans = 0');
  });

  it('should display 74B on the screen when 74B is clicked', () => {
    cy.get('[data-cy="7"]').click();
    cy.get('[data-cy="4"]').click();
    cy.get('[data-cy="B"]').click();
    cy.get('.equation-display').should('contain', '74B');
  });

  it('should diaplay 821 - 74B on the screen when 821 - 74B is clicked', () => {
    cy.get('[data-cy="8"]').click();
    cy.get('[data-cy="2"]').click();
    cy.get('[data-cy="1"]').click();
    cy.get('[data-cy="-"]').click();
    cy.get('[data-cy="7"]').click();
    cy.get('[data-cy="4"]').click();
    cy.get('[data-cy="B"]').click();
    cy.get('.equation-display').should('contain', '821 - 74B');
  });

  it('should display D6 on the screen when 821 - 74B is clicked and = is clicked', () => {
    cy.get('[data-cy="8"]').click();
    cy.get('[data-cy="2"]').click();
    cy.get('[data-cy="1"]').click();
    cy.get('[data-cy="-"]').click();
    cy.get('[data-cy="7"]').click();
    cy.get('[data-cy="4"]').click();
    cy.get('[data-cy="B"]').click();
    cy.get('[data-cy="="]').click();
    cy.get('.equation-display').should('contain', 'D6');
  });

  it('should clear the screen when clear [AC] is clicked after equation', () => {
    cy.get('[data-cy="8"]').click();
    cy.get('[data-cy="2"]').click();
    cy.get('[data-cy="1"]').click();
    cy.get('[data-cy="-"]').click();
    cy.get('[data-cy="7"]').click();
    cy.get('[data-cy="4"]').click();
    cy.get('[data-cy="B"]').click();
    cy.get('[data-cy="="]').click();
    cy.get('[data-cy="clear"]').click();
    cy.get('.equation-display').should('contain', '0');
    cy.get('.last-equation-display').should('contain', 'Ans = D6');
  });
})