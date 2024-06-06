# Guia de Como Contribuir

## Para os novos contribuidores

1. Faça um fork desse repositório.

2. Clone seu fork para sua máquina:
```bash
git clone https://github.com/SEU_USUARIO/cypress-faq.git
```
3. Acesse o repositório.

4. Adicione o repositório original como upstream, usando o comando:
```bash
git remote add upstream https://github.com/driuzzo/cypress-faq.git
```

5. Crie uma nova branch com as suas alterações (altere `nome-branch` para um nome que faça sentido com o que você irá implementar):
```bash
git checkout -b nome-branch
```

6. Se você for contribuir apenas com texto no README, pule para o tópico 13.

7. Se você for adicionar códigos de exemplo para serem executados, acesse a pasta projetos e crie uma pasta com o título do assunto, por exemplo: `forceTrue`.

8. No terminal, acesse a pasta que você criou.
```bash
cd projetos/suaPastaAqui
```

9. Dentro da pasta que você criou, rode o comando abaixo para criar um arquivo package.json e siga as instruções que forem aparecendo:
```bash
npm init
```

10. Em seguida, instale o cypress na sua pasta:
```bash
npm install cypress --save-dev
```
11. Crie o arquivo de teste dentro da pasta e2e, com o mesmo nome da sua pasta.

12. Crie um arquivo README.md dentro da sua pasta e adicione o texto do assunto a ser tratado.

13. Caso sua contribuição tenha apenas texto, você pode adicionar o conteúdo no arquivo README.md na raiz do projeto.

14. Salve as alterações e crie uma mensagem de commit contando o que você fez:
```bash
git commit -m "adicionado exemplo force true"
```
15. Envie as suas alterações: 
```bash
git push origin nome-branch
```
16. Verifique se a sua branch está atualizada com base no repositório `upstream` e submeta seu pull request!
Ex:

```bash
git fetch upstream
git checkout main
git reset --hard upstream/main  
git push origin main --force
```

## Solução de problemas comuns

Para atualizar a sua branch com as últimas alterações do repositório original, use:

```bash
git fetch upstream
git pull upstream main
```