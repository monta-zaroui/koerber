# Koerber technical assessment

Montassar Zaroui Koerber technical assessment

## Run the App

In your terminal run:
```bash
docker compose up --build
```

10 devices will be created and stored automatically in the database.


## Run tests

In your terminal run:
```bash
cd koerber-be && npm install && npm run test
```
The application will run by default on ports 3007 and 8007. there are 2 endpoints in the project:

1- Backend (nodeJs expressJs app): Running on port 3007

2- Frontend (Vue3 app): Running on port 8007
