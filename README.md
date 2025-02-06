# Number Api

This API returns some interesting facts about numbers from the given parameter.

The API is available at [here](`https://num-api-2.onrender.com/api/classify-number?number=371`)

## Endpoints

- [status](#status)
- [about](#about)

## Requirements
- Node.js 18 or Higher
- Pnpm 

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/Ng1n3/num-api.git
```

2. Install dependencies

```bash
pnpm install
```

3. start server

```bash
pnpm run dev
```

## Status

**`GET /`**

Returns the status of the API.

Example response:

```
{
  status: "OK",
  message: "Server is up and running!",
}
```

This indicates that the API is running as expected.

No response or any other response indicates that the API is not functioning correctly.

## About

**`GET /api/classify-number?number=371`**

Returns some info about me and this API service.

**Status Code**

| Status Code   | Description                             |
| ------------- | ----------------------------------------|
| 200 OK        | Indicates a successful response.        |
| 400 Bad REquest | Indicates a bad request to the server.|
| 404 Not Found | The Resource is not available.          |

Example of a 200 response:

```
{
	"number": 371,
	"is_prime": false,
	"is_perfect": false,
	"properties": [
		"armstrong",
		"odd"
	],
	"digit_sum": 11,
	"fun_fact": "371 is a narcissistic number."
}
```

Example of a 400 Bad Request:

```
{
	"number": "alphabet",
	"error": true
}
```

Example of a 404 Not Found:

```
{
	"message": "Route not found"
}
```

## Tech Stack

- [Nodejs-Developer](https://hng.tech/hire/nodejs-developers)