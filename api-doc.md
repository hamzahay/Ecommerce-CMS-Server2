# eCommerce-Server

List of available endpoints:
- `POST /login`
- `POST /products`

### POST /login

Request:

- data: 

```json
{
  "emai": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:

```json
{
  "id": "integer",
  "email": "string",
  "role": "string",
  "access_token": "string"
}
```

Error Response: 

- status: 401
- body: 

```json
{
  "errors": "wrong email / password"
}
```

### POST /products

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- data:

```json
{
  "name": "string",
  "image_url": "string",
  "price": "double",
  "stock": "integer"
}
```

Response:

- status: 201
- body:

```json
{
  "id": "integer",
  "name": "string",
  "image_url": "string",
  "price": "double",
  "stock": "integer"
}
```

Error Response:

- status: 401
- body: 

```json
{
  "errors": "string"
}
```

### GET /products

Request:

- headers:

```json
{
  "access_token": "string"
}
```

Response:

- status: 200
- body:

```json
[
  {
    "id": "integer",
    "name": "string",
    "image_url": "string",
    "price": "double",
    "stock": "integer"
  },
  {
    "id": "integer",
    "name": "string",
    "image_url": "string",
    "price": "double",
    "stock": "integer"
  }
]
```

### PUT /products/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params: integer (product id)

- data:

```json
{
  "name": "string",
  "image_url": "string",
  "price": "double",
  "stock": "integer"
}
```

Response:

- status: 200
- body:

```json
{
  "id": "integer",
  "name": "string",
  "image_url": "string",
  "price": "double",
  "stock": "integer"
}
```

Error Response when role in not admin:

- status: 403
- body:

```json
{
  "errors": "forbidden"
}
```

Error Response when specific data not found:

- status: 404
- body:

```json
{
  "errors": "not found"
}
```

### DELETE /products/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params: integer (product id)

Response: 

- status: 200
- body:

```json
{
  "message": "delete success"
}
```

Error Response when role in not admin:

- status: 403
- body:

```json
{
  "errors": "forbidden"
}
```

Error Response when specific data not found:

- status: 404
- body:

```json
{
  "errors": "not found"
}
```

### POST /carts/:productId

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params: integer (product id)

Response: 

- status: 201
- body:

```json
{
  "id": "integer",
  "UserId": "integer",
  "PoductId": "integer",
  "quantity": "integer",
  "status": "boolean",
}
```

### GET /carts

Request:

- headers:

```json
{
  "access_token": "string"
}
```

Response: 

- status: 201
- body:

```json
[
  {
    "id": "integer",
    "UserId": "integer",
    "PoductId": "integer",
    "quantity": "integer",
    "status": "boolean",
    "Product": {
      "id": "integer",
      "name": "string",
      "image_url": "string",
      "price": "double",
      "stock": "integer"
    }
  },
  {
    "id": "integer",
    "UserId": "integer",
    "PoductId": "integer",
    "quantity": "integer",
    "status": "boolean",
    "Product": {
      "id": "integer",
      "name": "string",
      "image_url": "string",
      "price": "double",
      "stock": "integer"
    }
  }
]
```