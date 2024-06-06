/// <reference types="cypress" />

describe('Visitando sem sucesso', () => {
  it('Deve falhar a visita', () => {
    cy.visit('https://www.alura.com.br/')
  })
})