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

      2. Create your own local db by executing `createDB <DB name>`

      3. Now open your psql shell with the DB you created: `psql -h localhost -U postgres -d <DB name>`

      4. Inside the psql shell execute `\conninfo`. And you will get the following info.  
          ![image](https://user-images.githubusercontent.com/39329182/236612291-51d87f69-6dc1-4a23-bf4d-1ca1754e0a35.png)

      5. Now extract all the info and add it to your DATABASE_URL. The url would look something like this `postgresql://postgres:postgres@localhost:5432/Your-DB-Name`. The port is configurable and does not have to be 5432.

    - If you don't want to create a local DB. Then you can also consider using services like railway.app or render.

      - [Setup postgres DB with railway.app](https://docs.railway.app/guides/postgresql)
      - [Setup postgres DB with render](https://render.com/docs/databases)

7. Setting up the migrations

    ```bash
    npm run migration:run
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
