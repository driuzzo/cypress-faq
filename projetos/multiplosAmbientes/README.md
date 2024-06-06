## Lidando com Múltiplos Ambientes com Cypress

Para rodar o mesmo projeto em ambientes diferentes, você pode configurar uma baseUrl e depois apontar o ambiente desejado ao rodar os scripts via linha de comando.

### Configuração do Ambiente

1. **Configuração Dinâmica com `baseUrl` via CLI**: Modifique o `cypress.config.js` para aceitar o `baseUrl` passado pela CLI e qualquer outra configuração específica do ambiente.

    ```javascript
    const { defineConfig } = require('cypress');

    module.exports = defineConfig({
        e2e: {

        baseUrl: 'http://staging.example.com', // url padrão, por exemplo: staging

        }
    });
    ```

### Executando Testes em Diferentes Ambientes

Use scripts npm para executar testes em ambientes específicos, configurando o `baseUrl` diretamente na linha de comando.

- **Desenvolvimento**: `npm run test:dev`
- **Homologação**: `npm run test:staging`
- **Produção**: `npm run test:prod`

Defina esses scripts no seu `package.json`:

```json
"scripts": {
    "test:dev": "cypress run --config baseUrl=http://localhost:3000",
    "test:staging": "cypress run --config baseUrl=http://staging.example.com",
    "test:prod": "cypress run --config baseUrl=http://example.com"
}
```

### Exemplo de Teste

Um exemplo de arquivo de teste (`cypress/e2e/configBaseUrl.cy.js`) que utiliza o `baseUrl` configurado:

```javascript
describe('Testes Específicos do Ambiente', () => {
    it('Visita a aplicação', () => {
        cy.visit('/');
        cy.url().should('include', Cypress.config('baseUrl'));
    });
});
```