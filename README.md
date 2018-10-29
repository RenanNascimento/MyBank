# MyBank

O MyBank é um sistema que simula um banco digital.
Ele foi feito para o processo seletivo da IBM.

## Instalação

* É necessário instalar como pré-requesito o Docker e o Docker Compose
* Faça o clone do repositório
* Entre na pasta e execute o seguinte comando
  
```
$ docker-compose build
```

* Em seguida, execute o próximo comando

```
$ docker-compose up
```

* Agora a aplicação estará rodando na porta 3000. Basta abrir o navegador e digitar

```
http://localhost:3000
```

## Estrutura da aplicação
Foram criados dois containers, um para o banco de dados 
(PostgreSQL) e outro para a aplicação web. O servidor 
foi criado utilizando Node.js e Express.js. Enquanto o frontend
foi feito com Bootstrap.

## Features

* Acessar o MyBank como administrador
* Cadastrar clientes no MyBank
* Visualizar o saldo de todos os clientes (pelo acesso como administrador)
* Visualizar o extrato do cliente
* Realizar saque
* Realizar depósito

## Ferramentas utilizadas

* Plataforma de containers
    * Docker
    * Docker Compose
* Banco de dados
    * PostgreSQL
    * Sequelize (ORM)
* Backend
    * Node.js
    * Express.js
* Frontend
    * Handlebars.js
    * Bootstrap