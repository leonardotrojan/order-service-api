# 📦 Order Service API — Back-end (Node.js, Express e PostgreSQL)

Projeto back-end de gerenciamento de pedidos, desenvolvido com **Node.js**, **Express** e **PostgreSQL**, com foco em **arquitetura limpa**, **regras de negócio** e **testes automatizados**.

---

## 🔍 Sobre o projeto

A aplicação simula um **serviço de pedidos** para e-commerce ou sistemas de delivery, incluindo:

* Criação e consulta de pedidos
* Controle de status do pedido (`pending`, `completed`, `canceled`)
* Exclusão de pedidos **com regras de negócio**
* Autenticação via **JWT**
* Testes unitários e de integração automatizados

O projeto foi pensado para representar **cenários reais de backend**, indo além de CRUDs simples.

---

## 🚀 Funcionalidades

* Listar todos os pedidos (`GET /orders`)
* Buscar pedido por ID (`GET /orders/:id`)
* Deletar pedidos com status válido (`DELETE /orders/:id`)
* Autenticação e autorização via JWT (`POST /login`)
* Validação de dados de entrada (DTOs)
* Tratamento global de erros
* Testes automatizados de services e rotas

---

## 🧠 Decisões técnicas

* Arquitetura em camadas (controllers, services, routes, middlewares)
* Prisma ORM centralizado (`src/prisma/client.js`)
* Transações para operações críticas
* Projeto em **ES Modules (ESM)**
* Testes unitários e de integração com Jest + Supertest
* Mock do Prisma para testes isolados

---

## 🗂 Estrutura

```
src/
├── app.js
├── server.js
├── routes/
│   ├── order.routes.js
│   └── auth.routes.js
├── controllers/
│   ├── order.controller.js
│   └── auth.controller.js
├── services/
│   └── order.service.js
├── middlewares/
│   ├── auth.middleware.js
│   └── error.middleware.js
├── dtos/
│   └── order.dto.js
├── prisma/
│   ├── client.js
│   └── schema.prisma
└── tests/
    ├── services/
    └── routes/
```

---

## 🛠 Tecnologias

* Node.js
* Express
* PostgreSQL
* Prisma ORM
* JWT (jsonwebtoken)
* Jest + Supertest
* ES Modules (ESM)

---

## 👤 Autor

**Leo**
Desenvolvedor Back-end