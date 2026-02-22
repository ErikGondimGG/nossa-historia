# ─── Stage 1: build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Instala dependências primeiro (cache layer separado do código)
COPY package*.json ./
RUN npm ci --prefer-offline

# Copia o restante e faz o build
COPY . .
RUN npm run build

# ─── Stage 2: serve ───────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Remove config padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia os assets do build e a config customizada
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
