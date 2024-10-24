<div style="display: flex; justify-content: space-between; align-items: center;">
  <div align="left">
    <h1>
      <a href="https://freeimage.host/i/2KsWCRR">
        <img src="https://iili.io/2KsWCRR.md.png" alt="AWS Logo" width="70px"/>
      </a>
      Projeto API de Alunos
    </h1>
  </div>
</div>

Este projeto é uma API para gerenciar alunos, permitindo o cadastro, listagem, atualização e exclusão de informações. A API foi desenvolvida utilizando **Node.js**, **Express**, **Prisma** e **PostgreSQL**, com autenticação JWT e documentação via **Swagger**.


## Tecnologias utilizadas

- **Node.js**: Ambiente JavaScript do lado do servidor.
- **Express**: Framework que facilita o desenvolvimento de rotas e APIs HTTP.
- **PostgreSQL**: Banco de dados relacional pra persistir e gerenciar as informações da aplicação .
- **Prisma**: ORM que simplifica as consultas no banco e migrações de dados.
- **Swagger UI**: Ferramenta de documentação interativa pra APIs, onde dá pra testar as rotas direto no navegador.
- **bcrypt**: Usado pra fazer o hash das senhas dos funcionarios.
- **jsonwebtoken**: Gera tokens JWT pra autenticação e controle de acesso na aplicação.
- **dotenv**: Carrega variáveis de ambiente do arquivo `.env` pra configurar a aplicação de forma segura.
- **cors**: Middleware que libera o compartilhamento de recursos entre origens diferentes (cross-origin), necessário pra permitir requisições de outros domínios.


## Requisitos

- Node.js **v16.13** ou superior (compativel com prisma)
- PostgreSQL em execução
- Arquivo `.env` configurado corretamente

## Configuração do ambiente

1. Clone o repositório:

    ```bash
    git clone https://github.com/TechNest-Academy/technest-backend.git
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente no arquivo `.env`:

    ```env
    DATABASE_URL="postgresql://username:password@host:port/database_name"
    PORT=3000
    ```

4. Certifique-se de que o PostgreSQL está em execução.

## Rodando a aplicação

1. Inicie o servidor:

    ```bash
    npm run dev
    ```

2. A API estará disponível em `http://localhost:3000`.

3. Os endpoints estão descritos no Swagger para testes diretos via navegador. Alternativamente, você pode utilizar a [coleção JSON](https://github.com/TechNest-Academy/technest-backend/blob/docs/routes-json/docs/insomnia_collection.json) no **Insomnia** ou **Postman**.

4. A documentação da API pode ser acessada via Swagger em:

    ```
    http://localhost:3000/api-docs
    ```


## Desenvolvedores

- [Marcelo Costa](https://github.com/159753marcelo)
- [Ewerton Bertoldo](https://github.com/EwertonRafael)
- [Felipe Macedo](https://github.com/felipemacedo1)