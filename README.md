# Job Finder

Aplicação web desenvolvida para praticar programação **fullstack com
JavaScript**. O projeto simula um portal simples de vagas de tecnologia,
permitindo consultar vagas cadastradas, pesquisar por título e publicar novas
oportunidades. Foi desenvolvida durante o curso "JavaScript do básico ao avançado (c/ Node.js e projetos)" do Matheus Batistti, disponível na Udemy.

O foco principal é aprender como as partes de uma aplicação web se conectam:

- servidor HTTP com Node.js e Express;
- páginas dinâmicas com Handlebars;
- persistência de dados com SQLite;
- mapeamento de modelos e consultas com Sequelize;
- formulários HTML e rotas `GET` e `POST`;
- organização básica entre rotas, modelos, banco de dados e arquivos públicos.

## Como funciona

O servidor inicia na porta `3000` e disponibiliza a aplicação em
`http://localhost:3000`.

Na página inicial, as vagas são carregadas do banco de dados e ordenadas da
mais recente para a mais antiga. O campo de pesquisa envia o parâmetro `job`
por `GET`, e a aplicação procura esse texto no título da vaga usando uma
consulta `LIKE`.

Também é possível:

1. acessar o formulário de publicação em `/jobs/add`;
2. preencher título, descrição, empresa, e-mail e salário;
3. enviar os dados com `POST /jobs/add`;
4. abrir os detalhes de uma vaga em `/jobs/view/:id`.

Após o cadastro, a aplicação salva a vaga no SQLite e redireciona o usuário
para a página inicial.

## Como compilar e executar

### Pré-requisitos

- Node.js instalado;
- npm instalado.

O banco de dados utilizado é o SQLite, portanto não é necessário instalar ou
configurar um servidor de banco separado.

### Instalação

Na raiz do projeto, instale as dependências:

```bash
npm install
```

### Execução em desenvolvimento

Inicie a aplicação com:

```bash
npm run dev
```

Esse comando executa o `nodemon`, que reinicia o servidor automaticamente
quando arquivos JavaScript, JSON ou módulos relacionados são alterados.

Depois, acesse:

```text
http://localhost:3000
```

O projeto não possui uma etapa de compilação ou bundle frontend. As páginas
Handlebars são renderizadas pelo Express no servidor, e os arquivos estáticos
ficam disponíveis diretamente pela pasta `public`.

## Exemplo de uso

### Consultar vagas

Abra:

```text
http://localhost:3000
```

As vagas cadastradas aparecem na página inicial. Para pesquisar, informe um
termo no campo de busca, como `Node.js`, e envie o formulário.

### Publicar uma vaga

Abra:

```text
http://localhost:3000/jobs/add
```

Preencha os campos obrigatórios:

- título da vaga;
- descrição;
- empresa contratante;
- e-mail de contato;
- salário oferecido.

O formulário envia os dados para `POST /jobs/add`. A vaga recebe `new_job = 1`
e aparece destacada na listagem.

### Visualizar uma vaga

Na listagem, selecione **Ver vaga**. O link utiliza o identificador da vaga e
abre uma página em:

```text
/jobs/view/:id
```

## Rotas disponíveis

| Método | Rota             | Função                                                |
| ------ | ---------------- | ----------------------------------------------------- |
| `GET`  | `/`              | Lista vagas ou pesquisa por título usando `?job=...`. |
| `GET`  | `/jobs/add`      | Exibe o formulário de cadastro.                       |
| `POST` | `/jobs/add`      | Cria uma nova vaga no banco de dados.                 |
| `GET`  | `/jobs/view/:id` | Exibe os detalhes de uma vaga.                        |

## Estrutura do código

```text
job-finder/
├── app.js                    # Configuração do Express e rotas principais
├── package.json              # Metadados, scripts e dependências
├── package-lock.json         # Versões exatas das dependências instaladas
├── db/
│   ├── app.db               # Banco de dados SQLite local
│   └── connection.js        # Conexão do Sequelize com o SQLite
├── models/
│   └── Job.js               # Modelo de vaga
├── routes/
│   └── jobs.js              # Rotas de cadastro e visualização
├── views/
│   ├── add.hbs              # Formulário de publicação
│   ├── index.hbs            # Listagem e pesquisa de vagas
│   ├── view.hbs             # Detalhes de uma vaga
│   └── layouts/
│       └── main.hbs         # Layout compartilhado das páginas
└── public/
    ├── css/
    │   └── styles.css       # Estilos da aplicação
    └── img/                 # Imagens usadas pela interface
```

### Fluxo da aplicação

1. `app.js` cria o servidor Express e configura o mecanismo Handlebars.
2. `db/connection.js` abre a conexão com `db/app.db`.
3. `models/Job.js` define a tabela lógica de vagas.
4. A rota `/` consulta o modelo `Job` e renderiza `views/index.hbs`.
5. `routes/jobs.js` concentra as operações de cadastro e consulta individual.
6. `views/layouts/main.hbs` fornece a estrutura HTML comum às páginas.
7. `public/css/styles.css` e as imagens complementam a interface.

### Modelo de vaga

O modelo `Job` possui os seguintes campos:

| Campo         | Tipo      | Descrição                                  |
| ------------- | --------- | ------------------------------------------ |
| `title`       | `STRING`  | Título da oportunidade.                    |
| `description` | `STRING`  | Descrição das atividades.                  |
| `salary`      | `STRING`  | Salário informado.                         |
| `company`     | `STRING`  | Nome da empresa.                           |
| `email`       | `STRING`  | E-mail de contato.                         |
| `new_job`     | `INTEGER` | Indicador usado para destacar vagas novas. |

Os campos `id`, `createdAt` e `updatedAt` são gerenciados pelo Sequelize.

## Tecnologias e conhecimentos desenvolvidos

- **JavaScript e Node.js:** execução de código no servidor e uso do sistema de
  módulos CommonJS.
- **Express:** criação do servidor, configuração de middlewares, arquivos
  estáticos e rotas.
- **Handlebars:** renderização de páginas com layout compartilhado e dados
  vindos do banco.
- **Sequelize:** definição do modelo `Job` e realização de consultas.
- **SQLite:** armazenamento local das vagas sem depender de um banco externo.
- **HTML e CSS:** construção dos formulários, listagens, página de detalhes e
  layout responsivo.
- **Bootstrap:** componentes e classes auxiliares de interface.
- **Git e GitHub:** uso básico das ferramentas de versionamento e colaboração,
  comuns no mercado.
- **Nodemon:** reinicialização automática do servidor durante o desenvolvimento.

## Limitações conhecidas

- O projeto é uma aplicação de estudo e não possui autenticação ou autorização.
- Qualquer pessoa com acesso à aplicação pode publicar uma vaga.
- Não há painel para editar ou excluir vagas.
- A validação dos dados é básica e ocorre principalmente pelos atributos dos
  formulários HTML.
- Não há paginação, filtros por localização, modalidade ou faixa salarial.
- O SQLite é local e não foi preparado para um ambiente de produção com
  múltiplos processos ou usuários.
- Não existem testes automatizados, pipeline de deploy ou configuração de
  variáveis de ambiente.
- O tratamento de erros ainda é simples, baseado principalmente em mensagens
  no console do servidor.
- O projeto depende de recursos do Bootstrap carregados por CDN, portanto a
  interface pode ser afetada sem conexão com a internet.

## Ideias de evolução

- adicionar autenticação para recrutadores e candidatos;
- criar operações de editar e excluir vagas;
- validar e sanitizar os dados no servidor;
- melhorar o tratamento de erros e apresentar mensagens na interface;
- adicionar paginação e filtros avançados;
- criar associações entre usuários, empresas e vagas;
- adicionar testes unitários e de integração;
- configurar variáveis de ambiente para porta e banco de dados;
- substituir o SQLite por PostgreSQL ou outro banco para produção;
- criar uma API REST para consumo por outras interfaces;
- melhorar acessibilidade, SEO e responsividade;
- publicar a aplicação em um serviço de hospedagem.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE)
para mais informações.
