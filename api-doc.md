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