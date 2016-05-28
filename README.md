# Simple NodeJS + Express + MongoDB REST TODO List API Sample

#### Get the code

`
git clone https://github.com/lennonjesus/sample-express-rest-api.git
`

### Go to project directory

`
cd sample-express-rest-api
`

### Install dependencies

`
npm install
`

### Start server

`
gulp serve
`

### Supported operations
`
GET /todos
`

`
GET /todos/{id}
`

`
POST /todos
`

`
PUT /todos/{id}
`

`
DELETE /todos/{id}
`

### Sample tests with cURL

`
curl http://localhost:3000/todos
`

`
curl http://localhost:3000/todos/PERSISTED-ID
`

`
curl -i -H "Content-Type: application/json" -X POST -d '{"title": "Todo item 1"}' http://localhost:3000/todos
`

`
curl -i -H "Content-Type: application/json" -X PUT -d '{"archived": "false"}' http://localhost:3000/todos/PERSISTED-ID
`

`
curl -i -H "Content-Type: application/json" -X DELETE -d '{"title": "Todo item 1"}' http://localhost:3000/todos/PERSISTED-ID
`
