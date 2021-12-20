## Tecnologias:

```table
| Tecnologia | Versão |
| ---------- | ------ |
|   Prisma   |  3.6.0 |
```

## Infos:

1.  Configuração do banco de dados:

Por padrão `POSTGRES_USER = postgres`;

Já o `POSTGRES_PASSWORD = docker` foi configurado como `docker`;

`DATABASE_URL="postgresql://POSTGRES_USER:POSTGRES_PASSWORD@localhost:5432/prismaexample?schema=public"`

```shell
docker run --name pg -p 5432:5432 -e POSTGRES_PASSWORD=docker -d -t postgres
```

2. Para criar nova migration:

Para pegar todas as alterações feitas no banco de dados, basta executar o comando para criar a tabela no banco:

```shell
npx prisma migrate dev
```

3. Para formatar o schema:

```shell
npx prisma format --schema=dev
```

4. Para atualizar o schema:

```shell
npx prisma db pull --schema=dev
```
