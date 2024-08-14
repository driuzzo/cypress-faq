/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Faz uma requisição para o endpoint passado como parâmetro em `resource`, através da função `getEndpoint`.
     * A função `getEndpoint` é responsável por construir a URL completa da requisição com base no `resource` e outros parâmetros.
     *
     * @param {string} resource Parâmetro referente ao valor e "options" da função getEndpoint.
     * @param {string} [queryParam] Parâmetro de consulta opcional a ser adicionado à URL.
     * @param {Record<string, string>} [headers] Headers personalizados para a requisição.
     * @returns {Chainable<Response>} Uma promessa que resolve para a resposta da requisição.
     *
     * @example
     * cy.getResource('todos').then((res) =>{
     *   .its('status').should('eq', 200)
     * })
     * @description
     */
    getResource<T>(resource: string, queryParam?: string, headers?: Record<string, string>): Chainable<Response<T>>;
    /**
     * Faz uma requisição POST para o endpoint especificado.
     *
     * @param {string} resource O endpoint para o qual a requisição será enviada.
     * @returns {Chainable<Response>} Uma promise que resolve para a resposta da requisição.
  
     * @example
     * cy.postResource('todos', { exemplo: "teste" })
     *   .its('status').should('eq', 201)
     */
    postResource<T>(resource: string, body: object): Chainable<Cypress.Response<T>>;
    /**
   * Faz uma requisição uma requisição PATCH para o endpoint especificado.
   *
   * @param {string} resource O endpoint para o qual a requisição será enviada.
   * @param {object} body O corpo da requisição.
   * @param {number} [queryParam] Parâmetro de consulta opcional.
   * @param {object} [headers] Headers de requisição opcionais.
   * @returns {Chainable<Response>} Uma promise que resolve para a resposta da requisição.
   *
   * @example
   * cy.patchResource('users/123', { name: 'Giovani' }, 1)
   *   .its('status').should('eq', 200)
   */
    patchResource<T>(resource: string, body: object, queryParam?: number, headers?: object): Chainable<Response<T>>;
    /**
   * Faz uma requisição uma requisição DELETE para o endpoint especificado.
   *
   * @param {string} resource O endpoint para o qual a requisição será enviada.
   * @param {number} [queryParam] Parâmetro de consulta opcional.
   * @returns {Chainable<Response>} Uma promise que resolve para a resposta da requisição.
   *
   * @example
   * cy.deleteResource('todos/123')
   *   .its('status').should('eq', 204)
   */
    deleteResource<T>(resource: string, queryParam?: number): Chainable<Response<T>>;
  }

}



function getEndpoint(resource) {
  const baseEndpoint = Cypress.env('endpoint')

  let options = {
    todos: "/todos",
    posts: "/posts"
  }
  return baseEndpoint + options[resource]
}

Cypress.Commands.add("getResource", (resource, queryParam?: string, headers?: Object) => {
  const endpoint = getEndpoint(resource)
  let url: string
  url = endpoint

  if (queryParam) {
    url = endpoint + '/?' + queryParam
  }

  let requestInfo = {
    method: 'GET',
    url: url,
    headers
  }
  return cy.request(requestInfo)
})

Cypress.Commands.add("postResource", (resource: string, body: object, headers?) => {
  const endpoint = getEndpoint(resource)

  let requestInfo = {
    method: 'POST',
    url: endpoint,
    body: body,

  }

  if (headers) {
    requestInfo['headers'] = headers
  }

  return cy.request(requestInfo)
})

Cypress.Commands.add("patchResource", (resource: string, body: object, queryParam?: number, headers?) => {
  const endpoint = getEndpoint(resource)
  let url = endpoint

  if (queryParam) {
    url = url + `/${queryParam}`
  }

  let requestInfo = {
    method: 'PATCH',
    url: url,
    body: body,
  }

  if (headers) {
    requestInfo['headers'] = headers
  }
  return cy.request(requestInfo)
})

Cypress.Commands.add("deleteResource", (resource: string, queryParam?: number) => {
  let endpoint = getEndpoint(resource)

  let requestInfo = {
    method: 'DELETE',
    url: endpoint + "/" + queryParam,
  }

  return cy.request(requestInfo)
})