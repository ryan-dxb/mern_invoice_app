ARG NODE_VERSION=16-alpine3.12

FROM node:${NODE_VERSION}

LABEL name="mern-invoice"
LABEL license="MIT"
LABEL description="MERN Invoice App"

ENV NODE_ENV=development

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

# Run docker as non-root user (user = invoice and group = invoice)
RUN addgroup --system invoice \
    && adduser --system --ingroup invoice invoice

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Change ownership of the app directory to the non-root user
COPY --chown=invoice:invoice . ${APP_HOME}

# Run docker as non-root user (user = invoice and group = invoice) -R for recursive
RUN chown -R invoice:invoice ${APP_HOME}

# Switch to non-root user
USER invoice

CMD ["npm", "run", "dev"]
