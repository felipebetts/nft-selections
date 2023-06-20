# NFT Selections

Este projeto é um desafio para uma vaga de desenvolvedor back-end na Lumx

A aplicação é uma api que permite que usuários criem seleções de NFTs e compartilhem para que seus amigos opinem sobre a coleção.

Para contruir a api foram utilizados Node.js + Express, escrita em Typescript. Utilizei o TypeORM e o banco de dados escolhido foi o MySQL. Para rodar tudo de uma forma simples, utlizei o docker e criei um makefile para aciona-lo.

## Documentação

Todas as rotas do app estão documentadas na postman collection localizada na root do projeto. Basta importar o arquivo `nft-selections.postman_collection.json` no postman.

## Iniciando a aplicacao

Para rodar o app, é necessario ter o docker instalado em seu computador.

Para iniciar, basta rodarmos o comando a seguir:

    make start

Para parar e destruir os containers, basta rodarmos o comando a seguir:

    make stop

**Obs**: Se você estiver com problemas para rodar os comandos make, tente rodar com o `sudo` na frente (erro comum para usuários linux sem config do docker group). Ex:

    sudo make start

## Testes

Criei testes para todas as rotas da aplicação utilizando jest. Isso facilitou o desenvolvimento e debugging.

Para iniciar os testes, basta rodarmos o comando a seguir:

    make test
