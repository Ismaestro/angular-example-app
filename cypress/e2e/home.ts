import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I visit the log-in page', () => {
  cy.visit('/');
});

Then('I should see an input', () => {
  cy.get('input').should('exist').should('be.visible');
});
