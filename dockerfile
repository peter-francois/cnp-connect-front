FROM node:24-alpine AS builder

WORKDIR /app
ARG VITE_API_BASE_URL
COPY package*.json .
RUN npm ci --omit=dev
COPY . .
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN echo "BASE API URL: $VITE_API_BASE_URL"
RUN npm run build

FROM nginx:1.28-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
#no write for group or other user than owner
RUN chmod -R 755 /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]