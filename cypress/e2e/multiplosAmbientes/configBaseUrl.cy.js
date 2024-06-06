/// <reference types="cypress" />

Cypress.on('uncaught:exception', () => {
    // Retorna false para impedir que o Cypress falhe o teste
    return false
})

describe('Testes Específicos do Ambiente', () => {
    it('Visita a aplicação', () => {
        cy.visit('/');
        cy.url().should('include', Cypress.config('baseUrl'));
    });
})