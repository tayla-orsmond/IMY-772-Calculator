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

  // Multiple equations
  it('should handle multiple equations in a row [EDA - 65 = E75, AB0 x 0 = 0, Clear, EDA x 4 = 3B68, Clear, EDA + 4 = EDE, 56]', () => {
    cy.get('[data-cy="E"]').click();
    cy.get('[data-cy="D"]').click();
    cy.get('[data-cy="A"]').click();
    cy.get('[data-cy="-"]').click();
    cy.get('[data-cy="6"]').click();
    cy.get('[data-cy="5"]').click();
    cy.get('[data-cy="="]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', 'E75');
    cy.get('[data-cy="lastEquation"]').invoke('text').should('equal', 'EDA - 65 =');

    cy.get('[data-cy="A"]').click();
    cy.get('[data-cy="B"]').click();
    cy.get('[data-cy="0"]').click();
    cy.get('[data-cy="x"]').click();
    cy.get('[data-cy="0"]').click();
    cy.get('[data-cy="="]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', '0');
    cy.get('[data-cy="lastEquation"]').invoke('text').should('equal', 'AB0 x 0 =');

    cy.get('[data-cy="clear"]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', '0');
    cy.get('[data-cy="lastEquation"]').invoke('text').should('equal', 'Ans = 0');

    cy.get('[data-cy="E"]').click();
    cy.get('[data-cy="D"]').click();
    cy.get('[data-cy="A"]').click();
    cy.get('[data-cy="x"]').click();
    cy.get('[data-cy="4"]').click();
    cy.get('[data-cy="="]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', '3B68');
    cy.get('[data-cy="lastEquation"]').invoke('text').should('equal', 'EDA x 4 =');

    cy.get('[data-cy="clear"]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', '0');
    cy.get('[data-cy="lastEquation"]').invoke('text').should('equal', 'Ans = 3B68');

    cy.get('[data-cy="E"]').click();
    cy.get('[data-cy="D"]').click();
    cy.get('[data-cy="A"]').click();
    cy.get('[data-cy="+"]').click();
    cy.get('[data-cy="4"]').click();
    cy.get('[data-cy="="]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', 'EDE');
    cy.get('[data-cy="lastEquation"]').invoke('text').should('equal', 'EDA + 4 =');

    cy.get('[data-cy="5"]').click();
    cy.get('[data-cy="6"]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', '56');
    cy.get('[data-cy="lastEquation"]').invoke('text').should('equal', 'EDA + 4 =');
  });

  // Clear
  it('should clear the screen when clear [AC] is clicked [after equation and initially]', () => {
    cy.get('[data-cy="clear"]').should('contain.text', 'AC');
    cy.get('[data-cy="clear"]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', '0');
    cy.get('[data-cy="lastEquation"]').invoke('text').should('equal', 'Ans = 0');

    cy.get('[data-cy="8"]').click();
    cy.get('[data-cy="2"]').click();
    cy.get('[data-cy="1"]').click();
    cy.get('[data-cy="-"]').click();
    cy.get('[data-cy="7"]').click();
    cy.get('[data-cy="4"]').click();
    cy.get('[data-cy="B"]').click();
    cy.get('[data-cy="clear"]').should('contain.text', 'CE');

    cy.get('[data-cy="="]').click();
    cy.get('[data-cy="clear"]').should('contain.text', 'AC');

    cy.get('[data-cy="clear"]').click();
    cy.get('[data-cy="clear"]').should('contain.text', 'CE');

    cy.get('[data-cy="equation"]').invoke('text').should('equal', '0');
    cy.get('[data-cy="lastEquation"]').invoke('text').should('equal', 'Ans = D6');
  });

  it('should backspace the last character when clear [CE] is clicked', () => {
    cy.get('[data-cy="8"]').click();
    cy.get('[data-cy="2"]').click();
    cy.get('[data-cy="1"]').click();
    cy.get('[data-cy="-"]').click();
    cy.get('[data-cy="7"]').click();
    cy.get('[data-cy="4"]').click();
    cy.get('[data-cy="B"]').click();
    cy.get('[data-cy="clear"]').should('contain.text', 'CE');
    cy.get('[data-cy="clear"]').click();
    cy.get('[data-cy="clear"]').should('contain.text', 'CE');
    cy.get('[data-cy="equation"]').invoke('text').should('equal', '821 - 74');

    cy.get('[data-cy="clear"]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', '821 - 7');

    cy.get('[data-cy="clear"]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', '821 - ');

    cy.get('[data-cy="clear"]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', '821');

    cy.get('[data-cy="clear"]').click();
    cy.get('[data-cy="clear"]').click();
    cy.get('[data-cy="clear"]').click();
    cy.get('[data-cy="equation"]').invoke('text').should('equal', '0');
    cy.get('[data-cy="clear"]').should('contain.text', 'CE');
  });

})