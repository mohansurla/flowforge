## Prerequisites

Node.js
npm (installed with Node.js)

Check your installed versions using:

node --version
npm --version

## Getting Started

npm install

Copy-Item .env.example .env

## Available Commands

npm run dev 

## API Endpoints

GET /health

Expected status: HTTP 200
{
  "status": "ok"
}

ANY Unknown routes

Expected status: HTTP 404

## Testing

npm test