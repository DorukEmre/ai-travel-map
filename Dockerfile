FROM nginx:1.29.3-alpine-slim

COPY nginx.conf /etc/nginx/nginx.conf

COPY frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
