#Rodar esse comando antes
#docker build -f Dockerfile.base.npm -t base.npm:latest .
FROM base.npm:latest as build
WORKDIR /app
COPY . .
RUN npm run build

# Etapa Final
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
