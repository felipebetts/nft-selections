# NFT Selections

Este projeto é um desafio para uma vaga de desenvolvedor back-end na Lumx

A aplicação é uma api que permite que usuários criem seleções de NFTs e compartilhem para que seus amigos opinem sobre a coleção.

Para contruir a api foram utilizados Node.js + Express, escrita em Typescript. Utilizei o TypeORM e o banco de dados escolhido foi o MySQL. Para rodar tudo de uma forma simples, utlizei o docker e criei um makefile para aciona-lo.

## Iniciando a aplicacao

Para rodar a app, é necessario ter o docker instalado em seu computador.

Para iniciar, basta rodarmos o comando a seguir:

    make start

Para parar e destruir os containers, basta rodarmos o comando a seguir:

    make stop

## Testes

Criei testes para todas as rotas da aplicação utilizando jest. Isso facilitou o desenvolvimento e debugging.

Para iniciar os testes, basta rodarmos o comando a seguir:

    make test
