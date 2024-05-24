## Cypress FAQ

Este documento foi criado para ajudar a solucionar os problemas mais comuns ao usar o Cypress. Se você não encontrar a resposta para sua pergunta aqui, fique à vontade para dar sugestões!

## Geral
### O Cypress não abre após a instalação.

Certifique-se de que você tenha a versão mínima necessária do Node.js e npm. Além disso, tente deletar a pasta `node_modules` e o arquivo `package-lock.json`, e então reinstale as dependências. Você pode deletar manualmente ou seguindo o comando abaixo:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Lidando com Exceções Não Capturadas

### O Cypress encontra uncaught excpetion durante a execução dos testes

Em alguns casos, o Cypress pode encontrar exceções não capturadas (erros de JavaScript) que fazem com que os testes falhem. Para continuar a execução dos testes, você pode usar o comando `Cypress.on('uncaught:exception', (err, runnable) => { return false })` para ignorar essas exceções.

#### Como usar `Cypress.on('uncaught:exception')`?

Adicione o seguinte código no arquivo de configuração de suporte (`cypress/support/e2e.js`) para ignorar todas as exceções não capturadas:

```javascript
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retorna false para impedir que o Cypress falhe o teste
  return false
})
```
### Quando devo usar esta abordagem?

Esta abordagem deve ser usada com cuidado. Ignorar exceções pode ocultar problemas reais no seu aplicativo que precisam ser corrigidos. Use-a principalmente quando você está ciente de um erro conhecido que não afeta os testes que você está executando.

### Há alguma alternativa para lidar com exceções específicas?

Sim, se você quiser lidar com exceções específicas, pode adicionar lógica dentro da função de callback para filtrar erros com base em suas mensagens ou outros atributos:

```javascript
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore exceções específicas com base na mensagem de erro
  if (err.message.includes('Expected error message')) {
    return false
  }
  // Permite que outras exceções interrompam os testes
  return true
})
```
### Exemplo Prático

Aqui está um exemplo prático que ignora um erro específico de uma biblioteca de terceiros, mas permite que outras exceções interrompam os testes:

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
