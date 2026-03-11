# -----------------------
# Builder Stage
# -----------------------
FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# -----------------------
# Production Stage
# -----------------------
FROM node:22-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --omit=dev


COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/node_modules ./node_modules

RUN npx prisma generate


EXPOSE 4000

CMD ["node", "dist/server.js"]