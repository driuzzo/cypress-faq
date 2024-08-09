/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     *   
     */
    getAllJson()
    validateAllJsonReturned()
    createPost(itle: string, body: string, user_id: number)
    updatePost(bodyEdit: string, titleEdit: string)
    deletePost()
  }
}

Cypress.Commands.add("getAllJson", () => {
  return cy.getResource("todos")
})

Cypress.Commands.add("validateAllJsonReturned", () => {
  cy.getAllJson().then((res) => {
    expect(res.status).eq(200)
  })
})

Cypress.Commands.add("createPost", (title: string, body: string, user_id: number) => {
  const request =
    cy.postResource("posts", {
      title: title,
      body: body,
      userId: user_id,
    })

  request.then((res) => {

    expect(res.status).eq(201)
    const { id, body, title, userId } = res.body;
    const expectedBody = {
      body,
      id,
      title,
      userId
    };

    expect(res.body).to.deep.equal(expectedBody);
  })
  return request
})


Cypress.Commands.add("updatePost", (bodyEdit: string, titleEdit: string) => {
  let { id, body, title, userId } = { id: 1, body: "Titulo Teste2 Editado", title: "Corpo do post", userId: 1 }
  cy.createPost(body, title, userId).then((res) => {

    id = res.body.id
    userId = res.body.userId
    title = res.body.title
    body = res.body.body


    cy.patchResource("posts", {
      title: titleEdit,
      body: bodyEdit,
      userId: userId,
    }, id).then((res) => {

      expect(res.status).eq(200);

      const expectedBody = {
        title: titleEdit,
        body: bodyEdit,
        userId: userId
      };

      expect(res.body).to.deep.equal(expectedBody);
    });

  })
})

Cypress.Commands.add("deletePost", () => {
  let { id, body, title, userId } = { id: 1, body: "Titulo Teste2 Editado", title: "Corpo do post", userId: 1 }
  cy.createPost(body, title, userId).then((res) => {

    id = res.body.id

    cy.deleteResource("posts", id)
  })
})



