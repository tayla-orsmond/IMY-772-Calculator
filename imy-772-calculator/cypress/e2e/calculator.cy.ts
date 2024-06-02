describe('Calculator e2e', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // General
  it('should have the correct title', () => {
    cy.title().should('equal', 'IMY-772-Calculator');
  });

  it('should have the correct heading', () => {
    cy.get('h1').should('contain', 'Hexadecimal Calculator');
  });

  // Calculator
  it('should have a calculator, screen and keyboard', () => { // check children components exist 
    cy.get('.calculator').should('exist');
    cy.get('.screen').should('exist');
    cy.get('.keyboard').should('exist');
  });

  it('should initally display 0 on the screen', () => {
    cy.get('.equation-display').should('contain', '0');
    cy.get('.last-equation-display').should('contain', 'Ans = 0');
  });

  // Display
  it('should display 74B on the screen when 74B is clicked', () => {
    cy.get('[data-cy="7"]').click();
    cy.get('[data-cy="4"]').click();
    cy.get('[data-cy="B"]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', '74B');
  });

  // Equations
  it('should display 821 - 74B on the screen when 821 - 74B is clicked', () => {
    cy.get('[data-cy="8"]').click();
    cy.get('[data-cy="2"]').click();
    cy.get('[data-cy="1"]').click();
    cy.get('[data-cy="-"]').click();
    cy.get('[data-cy="7"]').click();
    cy.get('[data-cy="4"]').click();
    cy.get('[data-cy="B"]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', '821 - 74B');
  });

  it('should display 4AA + 98 on the screen when 4AA + 98 is clicked', () => {
    cy.get('[data-cy="4"]').click();
    cy.get('[data-cy="A"]').click();
    cy.get('[data-cy="A"]').click();
    cy.get('[data-cy="+"]').click();
    cy.get('[data-cy="9"]').click();
    cy.get('[data-cy="8"]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', '4AA + 98');
  });

  it('should display E1 x 2 on the screen when E1 x 2 is clicked', () => {
    cy.get('[data-cy="E"]').click();
    cy.get('[data-cy="1"]').click();
    cy.get('[data-cy="x"]').click();
    cy.get('[data-cy="2"]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', 'E1 x 2');
  });

  it('should display 8 ÷ C on the screen when 8 ÷ C is clicked', () => {
    cy.get('[data-cy="8"]').click();
    cy.get('[data-cy="÷"]').click();
    cy.get('[data-cy="C"]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', '8 ÷ C');
  });

  // Results
  it('should display D6 on the screen when 821 - 74B = is clicked', () => {
    cy.get('[data-cy="8"]').click();
    cy.get('[data-cy="2"]').click();
    cy.get('[data-cy="1"]').click();
    cy.get('[data-cy="-"]').click();
    cy.get('[data-cy="7"]').click();
    cy.get('[data-cy="4"]').click();
    cy.get('[data-cy="B"]').click();
    cy.get('[data-cy="="]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', 'D6');
    cy.get('[data-cy="lastEquation"]').invoke('text').should('equal', '821 - 74B =');
  });

  it('should display 542 on the screen when 4AA + 98 = is clicked', () => {
    cy.get('[data-cy="4"]').click();
    cy.get('[data-cy="A"]').click();
    cy.get('[data-cy="A"]').click();
    cy.get('[data-cy="+"]').click();
    cy.get('[data-cy="9"]').click();
    cy.get('[data-cy="8"]').click();
    cy.get('[data-cy="="]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', '542');
    cy.get('[data-cy="lastEquation"]').invoke('text').should('equal', '4AA + 98 =');
  });

  it('should diaplay 1C2 on the screen when E1 x 2 = is clicked', () => {
    cy.get('[data-cy="E"]').click();
    cy.get('[data-cy="1"]').click();
    cy.get('[data-cy="x"]').click();
    cy.get('[data-cy="2"]').click();
    cy.get('[data-cy="="]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', '1C2');
    cy.get('[data-cy="lastEquation"]').invoke('text').should('equal', 'E1 x 2 =');
  });

  it('should display 0 on the screen when 8 ÷ C = is clicked', () => {
    cy.get('[data-cy="8"]').click();
    cy.get('[data-cy="÷"]').click();
    cy.get('[data-cy="C"]').click();
    cy.get('[data-cy="="]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', '0');
    cy.get('[data-cy="lastEquation"]').invoke('text').should('equal', '8 ÷ C =');
  });
})