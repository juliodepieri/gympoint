<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/logo.png" width="200px" />
</h1>

<h3 align="center">
  Projeto final - Rocketseat bootcamp 
</h3>
<h3 align="center">

</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/juliodepieri/gympoint?color=%2304D361">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/juliodepieri/gympoint/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/juliodepieri/gympoint?style=social">
  </a>
</p>

## Sobre o projeto

A aplicação desenvolvida é um gerenciador de academia chamado Gympoint, composto de três projetos: back-end(NodeJS), front-end(ReactJS) e mobile(React-Native).


### Instalação

Database

Para criar o banco de dados execute na pasta raiz do projeto o comando:

```
$> docker-compose up -d
```

### Back-end

Na pasta backend deve ser criado um arquivo .env de acordo com o modelo .env.example. 

Instalar as dependências do projeto

```
$> yarn
```

Iniciar back-end

```
$> yarn dev
```

Para criar as tabelas

```
$> yarn sequelize db:migrate
```

Dados iniciais para teste

```
$> yarn sequelize db:seed:all
```

Iniciar o gerenciador de filas

```
$> yarn queue
```

### Front-end

Instalar as dependências do projeto

```
$> yarn
```

Iniciar aplicação front-end

```
$> yarn start
```

### Mobile

O projeto mobile foi feito e testado no **ANDROID** utilizando **Genymotion**.

Instalar as dependências do projeto

```
$> yarn
```
### Iniciar aplicação

```
$> react-native start
$> react-native run-android
```
