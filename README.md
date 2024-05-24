## Cypress FAQ

Este documento foi criado para ajudar a solucionar os problemas mais comuns ao usar o Cypress. Se você não encontrar a resposta para sua pergunta aqui, fique à vontade para dar sugestões!

## Geral
### O Cypress não abre após a instalação.

Certifique-se de que você tenha a versão mínima necessária do Node.js e npm. Além disso, tente deletar a pasta `node_modules` e o arquivo `package-lock.json`, e então reinstale as dependências. Você pode deletar manualmente ou rodando o seguinte comando no terminal (lembre-se de estar na raiz do projeto):

```bash
rm -rf node_modules package-lock.json
npm install
```

## Lidando com Exceções Não Capturadas

### O Cypress encontra uncaught exception durante a execução dos testes

Em alguns casos, o Cypress pode encontrar exceções não capturadas (erros de JavaScript) que faz o teste falhar. Para continuar a execução dos testes, você pode usar o comando `Cypress.on('uncaught:exception', (err, runnable) => { return false })` para ignorar essa exceção.

#### Como usar `Cypress.on('uncaught:exception')`?

Adicione o comando abaixo no arquivo de configuração (`cypress/support/e2e.js`) para ignorar todas as exceções não capturadas:

```javascript
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retorna false para impedir que o Cypress falhe o teste
  return false
})
```
### Quando devo usar esta abordagem?

Esta abordagem deve ser usada com cuidado. Ignorar exceções pode ocultar problemas reais que precisam ser corrigidos na sua aplicação. Use se você sabe que é um erro conhecido que não afeta os testes que você está executando.

### Há alguma alternativa para lidar com exceções específicas?

Sim, se você quiser lidar com exceções específicas, você pode adicionar lógica dentro da função de callback para filtrar erros dependendo da mensagem ou outros atributos:

```javascript
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignora exceções específicas com base na mensagem de erro
  if (err.message.includes('Expected error message')) {
    return false
  }
  // Permite que outras exceções interrompam os testes
  return true
})
```
### Exemplo Prático

O exemplo abaixo ignora um erro específico de uma biblioteca de terceiros, mas permite que outras exceções interrompam os testes:

```javascript
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignora erros da biblioteca 'ResizeObserver'
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false
  }
  // Permite que outras exceções interrompam os testes
  return true
})
```
