# Executando com Docker

Execute o comando abaixo para construir a imagem:

```shell
$ docker build -t marcasus-api .
```

Execute o comando abaixo para executar a imagem conforme seu SO:

```shell
$ docker run --rm -it --network=host marcasus-api # Linux
$ docker run --rm -it -p 8080:8080 marcasus-api # Windows
```

# Acessando a API

A rota inicial da API é:

```
http://localhost:8080/api
```

A rota do Swagger é:

```
http://localhost:8080/swagger-ui/index.html
```