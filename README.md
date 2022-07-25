# fastinex(Express & Fastify & Nest)

### Created for learning perspective

## Installation

```bash
npm install
```

## Usage

```bash
npm run express:dev
```

```bash
npm run fastify:dev
```

---

## Postman [workspace](https://app.getpostman.com/join-team?invite_code=e8dd2bc39814080ea0f797980870e672&target_code=fb448012f99536a86f501d4a093c9b91)

[Express env](https://go.postman.co/workspace/My-Workspace~12cf23ba-c208-4fa3-8d3d-4b40078992cc/environment/21971734-9abd5136-3fc2-4aab-8405-a9abec605730)

[Fastify env](https://go.postman.co/workspace/My-Workspace~12cf23ba-c208-4fa3-8d3d-4b40078992cc/environment/21971734-9abd5136-3fc2-4aab-8405-a9abec605730)

[Nest env](https://go.postman.co/workspace/My-Workspace~12cf23ba-c208-4fa3-8d3d-4b40078992cc/environment/21971734-9abd5136-3fc2-4aab-8405-a9abec605730)

### Or use Postman' import json files

[Workspace](./fastinex.postman_collection.json)

[Express env](./Express.postman_environment.json)

[Fastify env](./Fastify.postman_environment.json)

[Fastify env](./Nest.postman_environment.json)

---

### To fill BD with mock data use

```bash
npm run mock:users
```

```bash
npm run mock:products
```

## TODO

1. Implement express/fastify endpoints to nest app
2. Integrate Swagger in
   - Express app
   - Fastify app
3. Play with mongo/mongoose one2one, one2many, many2many(check TODO user model)
4. Implement common error handler in express app(check TODO errorHandler)
5. Implement sign up/sign in as in nest app
6. check all todos
