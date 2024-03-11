# Build the Next.js app
FROM node:alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Generate a self-signed SSL certificate
FROM alpine:latest as certs
RUN apk add --no-cache openssl
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=www.example.com"

# Serve the app with Nginx
FROM nginx:alpine
COPY --from=builder /app/.next /usr/share/nginx/html
COPY --from=builder /app/public /usr/share/nginx/html/_next/static
COPY --from=certs /etc/ssl/certs/nginx-selfsigned.crt /etc/ssl/certs/
COPY --from=certs /etc/ssl/private/nginx-selfsigned.key /etc/ssl/private/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]