FROM node:22-alpine
LABEL version="1.0"
LABEL maintainer="BreizhRP"
LABEL description="Docker image for BreizhRP website"
LABEL environment="recette"

RUN apk add --no-cache bash build-base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000

CMD [ "node", "app.js" ]
