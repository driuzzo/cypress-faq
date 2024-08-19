/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Obtém todos os dados do endpoint /todos.
     *
     * @returns Uma promessa que resolve para um array de objetos JSON.
     *
     * @example
     * cy.getAllJson().then(data => {
     *   expect(data.length).to.be.greaterThan(0)
     * })
     */
    getAllJson(): Chainable<any>

    /**
     * Cria um novo post.
     *
     * @param title Título do post.
     * @param body Corpo do post.
     * @param userId ID do usuário que criou o post.
     *
     * @returns Uma promessa que resolve para o objeto do post criado.
     *
     * @example
     * cy.createPost('Meu primeiro post', 'Conteúdo do post', 1)
     */
    createPost(title: string, body: string, userId: number): Chainable<Post>

    /**
   * Atualiza um post existente.
   *
   * @param bodyEdit Novo corpo do post.
   * @param titleEdit Novo título do post.
   *
   * @returns Uma promessa que resolve para o objeto do post atualizado.
   *
   * @example
   * cy.updatePost('Novo corpo', 'Novo título')
   *   .then(post => {
   *     expect(post.title).to.equal('Novo título')
   *   })
   */
    updatePost(bodyEdit: string, titleEdit: string, id: number): Chainable<Post>

    /**
   * Deleta um post.
   *
   * @returns Uma promessa que resolve quando a operação é concluída.
   *
   * @example
   * cy.deletePost()
   */
    deletePost(id: number)

  }

}

Cypress.Commands.add("getAllJson", () => {
  return cy.getResource("todos").then((res) => {
    expect(res.status).eq(200)
    return res.body
  })
})

Cypress.Commands.add("createPost", (title: string, body: string, userId: number) => {
  return cy.postResource("posts", {
    body,
    title,
    userId,
  })
    .then((res) => {
      if (res.status === 201) {
        const createdPost = res.body
        expect(createdPost).to.have.property('id')
        expect(res.body['title']).eq(title)
        expect(res.body['body']).eq(body)
        expect(res.body['userId']).eq(userId)
        return createdPost as Post
      } else {  
        throw new Error('Falha ao criar o post')
      }
    })
})



Cypress.Commands.add("updatePost", (bodyEdit: string, titleEdit: string, id: number) => {
  return cy.patchResource("posts", {
    title: titleEdit,
    body: bodyEdit,
  }, id)
    .then((res) => {
      expect(res.status).to.eq(200)
      const updatedPost = res.body
      expect(updatedPost).to.deep.equal({
        title: titleEdit,
        body: bodyEdit,
        userId: updatedPost['userId'],
        id: updatedPost['id']
      })
      return updatedPost as Post
    })
})



Cypress.Commands.add("deletePost", (id: number) => {
  return cy.deleteResource("posts", id).then((res) =>{
    expect(res.status).eq(200)
  })
})