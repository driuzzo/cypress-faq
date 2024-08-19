describe('Endpoint Json -', () => {
    it('Validar requisicao GET /todos no endpoint de json', () => {
        cy.getAllJson()
    })
    it('Validar requisicao POST /posts no endpoint de json', () => {
        cy.createPost("Titulo Teste2", "Corpo do post2", 2)
    })
    it('Atualizar post com requisicao PATCH /posts{id} no endpoint de json', () => {
        let postId = 1;
        cy.updatePost("Titulo Teste2 Editado", "Corpo do post Editado", postId)
    })
    it('Deletar post com requisicao DELETE /posts{id} no endpoint de json', () => {
        cy.deletePost(1)
    })
})