#Rodar esse comando antes
#docker build --no-cache -f Dockerfile.base.npm -t base-marquei-frontend.npm:latest .
FROM base-marquei-frontend.npm:latest as build
WORKDIR /app
COPY . .
RUN npm run build

# Etapa Final
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
