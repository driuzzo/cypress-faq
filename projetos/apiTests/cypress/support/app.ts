

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
* * @example cy.getResource()
*   Realiza um get no endpoint passado como parametro
*   @param {string} resource
*   @param {string} queryParam
*/
    getResource(resource, queryParam?: string, headers?: Object): Chainable;
    postResource(resource: string, body: object)
    patchResource(resource: string, body: object, queryParam?: number, headers?)
    deleteResource(resource: string, queryParam?: number)

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
    url = url + `/${queryParam}`;
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
    url: endpoint + "/"+ queryParam,
  }


  return cy.request(requestInfo)
})