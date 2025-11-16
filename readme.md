# URL Shortener

A simple URL shortening service built with Node.js.

## Prerequisites

- Node.js (v14+ recommended)
- npm

---

## Setup

1. Clone the repository:

```bash
git clone https://github.com/JATIN-GUPTA-2108/Url-Shortner.git
cd Url-Shortner
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory if needed (for example, to store secret keys or database URLs).

---

## Running the Project

Start the development server:

```bash
npm run dev
```

The server will run at:

```
http://localhost:8000
```

---

## Sample Request

Test the URL shortening endpoint using `curl`:

```bash
curl -X POST \
  'http://localhost:8000/link' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "url":"https://www.youtube.com/watch?v=RLsYNh7GN-k&list=RDAbkEmIgJMcU&index=14"
}'
```

### Example Response

```json
{
  "shortUrl": "http://localhost:8000/abcd1234"
}
```

> The actual short URL will depend on your implementation.

---

### ENV Variables
```
MONGO_DB_URI = "xxxx"
DEPLOY_URL = "https://url-shortner-ub42.onrender.com" // this is currently deployed link , use localhost for running it locally 

```

### Deployment

Deployed using render on backend : https://url-shortner-ub42.onrender.com

## Notes

- Make sure your `.env` file (if used) contains all required environment variables.
- You can use tools like **Thunder Client**, **Postman**, or `curl` to test the endpoints.
- Stop the server anytime with `Ctrl + C`.
