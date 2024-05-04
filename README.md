# Node Express Drizzle

Node Express drizzle-orm boilerplate in ECMAScript Modules(mjs)

## Getting Started

Access all the api-docs in this repository follow this link [API DOC LINK](https://node-express-drizzle.yadav-saurabh.com/api-docs/)

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

### ubuntu instance like in AWS,oracle etc

1. Update the system

    ```bash
    sudo apt update        # Fetches the list of available updates
    sudo apt upgrade       # Installs some updates; does not remove packages
    sudo apt full-upgrade  # Installs updates; may also remove some packages, if needed
    sudo apt autoremove    # Removes any old packages that are no longer needed
    ```

2. install pm2 globally

    ```bash
    npm install pm2 -g
    ```

3. Follow Development setup to get up and running the server in the instance

4. Expose the instance to the network for the node_server_port (Ingress Rules for TCP protocol)

5. allow firewall to accept the network for the port

    ```bash
    sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport node_server_port -j ACCEPT
    sudo netfilter-persistent save
    ```

6. use the public ip of the instance to access the node server ex: 111.11.11.11:node_server_port

#### using a custom domain (nginx and certbot)

1. Expose instance to accepts network on port 80 and 443 (Ingress Rules for TCP protocol)

2. allow firewall for port 80 and 443

    ```bash
    sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
    sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
    sudo netfilter-persistent save
    ```

3. install nginx

    ```bash
    sudo apt update
    sudo apt install nginx
    ```

4. Now, you will create a configuration block for the Node server

    ```bash
    sudo nano /etc/nginx/sites-available/your_domain
    ```

    add this to the file /etc/nginx/sites-available/your_domain

    ```text
      server {
        server_name your_domain www.your_domain;
          location / {
            proxy_pass http://localhost:node_server_port;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
          }
      }
    ```

5. Create a symlink, which tells Nginx to look for available web applications in the sites-available folder:

    ```bash
    sudo ln -s /etc/nginx/sites-available/your_domain /etc/nginx/sites-enabled/
    ```

6. Disable the default symlink otherwise, nginx will redirect all requests to the default site. Use the following command to unlink it.

   ```bash
    sudo unlink /etc/nginx/sites-enabled/default
    ```

7. Restart the Nginx service using the following command.

   ```bash
    sudo systemctl restart nginx
    ```

8. Install certbot

    ```bash
    sudo snap install core; sudo snap refresh core
    sudo snap install --classic certbot
    sudo ln -s /snap/bin/certbot /usr/bin/certbot
    ```

9. Obtain an SSL Certificate

    ```bash
    sudo certbot --nginx -d example.com -d www.example.com
    ```

10. Verifying Certbot Auto-Renewal

    ```bash
    sudo systemctl status snap.certbot.renew.service
    ```

## TODO

- [ ] Test
- [ ] CI/CD
