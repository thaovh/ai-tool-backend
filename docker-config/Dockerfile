FROM node:18-alpine AS builder

LABEL maintainer="AI Tool Backend"
LABEL version="1.0"
LABEL description="AI Tool Backend Application"

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine AS production

LABEL maintainer="AI Tool Backend"
LABEL version="1.0"
LABEL description="AI Tool Backend Application"

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

CMD ["node", "dist/main"] 