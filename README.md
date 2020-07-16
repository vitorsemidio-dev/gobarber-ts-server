# Go Barber Server

Tabela de conteúdos
=================
<!--ts-->
* [Tabela de Conteudo](#tabela-de-conteudo)
* [Como usar](#como-usar)
* [Pré-requisitos](#pré-requisitos)
  * [Docker](#docker)
  * [ORM COnfig](#ORMConfig)
* [Como rodar o projeto](#como-rodar-o-projeto)
<!--te-->

## Badges

<img src="https://img.shields.io/static/v1?label=Blog&message=Rocketseat&color=7159c1&style=for-the-badge&logo=gatsby"/>

## Pré-requisitos

### Docker

Deve-se ter o docker instalado para utilizar as imagens dos bancos de dados necessários para aplicação.

Instalação PostgreSQL:

```
# Imagem do PostgreSQL com nome "gobarber_postgres", rodando na porta 5432 e com senha "docker"
$ docker run --name gobarber_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

Instalação MongoDB:

```
# Imagem do Mongo com nome "gobarber_mongodb" rodando na porta 27017
$ docker run --name gobarber_mongodb -p 27017:27017 -d -t mongo
```

Instalação Redis:

```
# Imagem do Redis com nome "gobarber_redis" rodando na porta 6379
$ docker run --name gobarber_redis -p 6379:6379 -d -t redis:alpine
```

### ORMConfig

Deve-se criar o arquivo **ormconfig.json** e preenchê-lo com os dados de acordo com as imagens do docker criadas.

```json
[
  {
    "name": "default",
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "docker",
    "database": "gostack_gobarber",
    "entities": [
      "./src/modules/**/infra/typeorm/entities/*.ts"
    ],
    "migrations": [
      "./src/shared/infra/typeorm/migrations/*.ts"
    ],
    "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
  },

  {
    "name": "mongo",
    "type": "mongodb",
    "host": "localhost",
    "port": 27017,
    "database": "gostack_gobarber",
    "useUnifiedTopology": true,
    "entities": [
      "./src/modules/**/infra/typeorm/schemas/*.ts"
    ]
  }

]
```

## Como rodar o projeto

