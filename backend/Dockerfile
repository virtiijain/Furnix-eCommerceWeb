FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./


FROM base AS deps
RUN npm install --production


FROM deps AS production
COPY . .
EXPOSE 5500
CMD ["node", "server.js"]
