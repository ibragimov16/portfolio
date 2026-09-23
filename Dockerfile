#Stage 1
FROM node:alpine AS builder
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

#Stage 2
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./* 
COPY --from=builder /app/build .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
