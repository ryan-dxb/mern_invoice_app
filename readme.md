MERN INVOICE

# To Build Images Using Docker Compose

-> docker compose -f local.yml up --build -d --remove-orphans

# To check logs of specific services in the container

-> docker compose -f local.yml logs api

# To check current user running docker

-> docker run --rm mern-invoice-api whoami

# To check Mongo DB Data Voume

-> docker volume inspect mern-invoice_mongodb-data

# Shutting down all containers

-> docker compose -f local.yml down
