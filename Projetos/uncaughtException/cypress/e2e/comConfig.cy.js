/// <reference types="cypress" />

Cypress.on('uncaught:exception', () => {
  // Retorna false para impedir que o Cypress falhe o teste
  return false
})

describe('Visitando com sucesso', () => {
  it('Deve visitar com sucesso', () => {
    cy.visit('https://www.alura.com.br/')
  })
})