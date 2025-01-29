# CRUD AGRO

## Teste técnico - Brain Agricuture

### Obetivo do teste

A proposta é criar uma aplicação para gerenciar o cadastro de produtores rurais, com os seguintes dados:

* CPF ou CNPJ
* Nome do produtor
* Nome da fazenda (propriedade)
* Cidade
* Estado
* Área total da fazenda (em hectares)
* Área agricultável (em hectares)
* Área de vegetação (em hectares)
* Safras (ex: Safra 2021, Safra 2022)
* Culturas plantadas (ex.: Soja na Safra 2021, Milho na Safra 2021, Café na Safra 2022)

Requisitos de negócio

* Permitir o cadastro, edição e exclusão de produtores rurais.
* Validar o CPF ou CNPJ fornecido pelo usuário.
* Garantir que a soma das áreas agricultável e de vegetação não ultrapasse a área total da fazenda.
* Permitir o registro de várias culturas plantadas por fazenda do produtor.
* Um produtor pode estar associado a 0, 1 ou mais propriedades rurais.
* Uma propriedade rural pode ter 0, 1 ou mais culturas plantadas por safra.
* Exibir um dashboard com:
* Total de fazendas cadastradas (quantidade).
* Total de hectares registrados (área total).
* Gráficos de pizza:
* Por estado.
* Por cultura plantada.
* Por uso do solo (área agricultável e vegetação).

### Instalação do projeto

1. Clone o repositório:

```Bash
git clone https://github.com/osvaldoaurelio/crud-agro-api.git
cd crud-agro-api
```

2. Instale as dependências do projeto

```Bash
npm i
# or
yarn

```

duplique o arquivo .env.example e renovei-o para .env

---

### Banco de dados Postgres (Docker)

1. Suba o container do postgres

```Bash
docker-compose up --build # --build cria e inicia o container 
```

Comandos úteis

```Bash
docker-compose down # Parar o container
docker ps -a        # Listar todos os containers
```

### ORM Prisma

1. Gerar cliente prisma

```Bash
  npx prisma generate
```

comandos úteis

```Bash
npx prisma migrate dev # Aplicar migrações ao banco de dados
npx prisma studio      # Iniciar o prisma studio
```

### Iniciar o projeto

1. Iniciar o servidor

```Bash
npm run start:dev
# or
yarn start:dev
```

Acesse o swagger em: http://localhost:3333/v1/api/docs
