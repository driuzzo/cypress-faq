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
6. Salve as alterações e crie uma mensagem de commit contando o que você fez:
```bash
git commit -m "adicionado exemplo force true"
```
7. Envie as suas alterações: 
```bash
git push origin nome-branch
```
8. Verifique se a sua branch está atualizada com base no repositório `upstream` e submeta seu pull request!
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