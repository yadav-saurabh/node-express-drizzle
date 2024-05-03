# Node Express Drizzle

Node Express drizzle-orm boilerplate in ECMAScript Modules(mjs)

## Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

Here is what you need.

- Node.js (Version: >= 20.x)
- PostgreSQL (Version: >= 16.x)
- npm

## Development

### Setup

1. Setup Node If your Node version does not meet the project's requirements as instructed by the docs, either [manually](https://nodejs.org/dist/latest-v20.x/) or using a tool like [nvm](https://github.com/nvm-sh/nvm) or [volta](https://volta.sh/) (recommended)

2. Clone the repo

    ```bash
    git clone git@github.com:yadav-saurabh/node-express-drizzle.git
    ```

3. Go to the project folder

    ```bash
    cd node-express-drizzle
    ```

4. Install packages with yarn

    ```bash
    npm i
    ```

5. Set up your `.env` file

    - Duplicate `.env.example` to `.env`
    - Use `openssl rand -base64 32` to generate a key and add it under `JWT_SECRET` in the `.env` file.
    - Configure environment variables in the `.env` file. Replace `<db_name>`, `<db_user>`, `<db_password>`, `<db-host>` and `<db-port>` with their applicable values

      ```text
        # Database Credentials
        POSTGRESQL_HOST=<db-host>
        POSTGRESQL_PORT=<db-port>
        POSTGRESQL_DB_NAME=<db_name>
        POSTGRESQL_DB_USER=<db_user>
        POSTGRESQL_DB_PASSWORD=<db_password>
      ```

6. Database Setup

    - Quick start database using `docker-compose`

      > - **Requires Docker and Docker Compose to be installed**
      > - Will start a local Postgres instance

      ```bash
      docker-compose up
      ```

    - Manual Database setup

      1. [Download](https://www.postgresql.org/download/) and install postgres in your local (if you don't have it already).

      2. connect to postgres prompt `sudo -u postgres psql`

      3. Create a new user `CREATE USER my_user WITH ENCRYPTED PASSWORD 'user_password';`

      4. Create your own local db by executing `create database my_database;`

      5. Create your own local db by executing `grant all privileges on database my_database to my_user;`

      6. Now extract all the info and add it to your `.env`. The port is configurable and does not have to be 5432.

    - If you don't want to create a local DB. Then you can also consider using services like railway.app or render.

      - [Setup postgres DB with railway.app](https://docs.railway.app/guides/postgresql)
      - [Setup postgres DB with render](https://render.com/docs/databases)

7. Setting up the migrations

    ```bash
    npm run drizzle:migration-run
    ```

8. Run the node server

    - In Development

      ```bash
      npm run dev
      ```

    - In Production

      ```bash
      npm start
      ```

## Deployment
