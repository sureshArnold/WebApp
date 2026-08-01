FROM node:26 as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# copies the rest of the project
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html  

EXPOSE 80

CMD ["nginx","-g","daemon off;"]


