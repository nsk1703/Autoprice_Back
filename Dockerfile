FROM node:12.13.0 as build

LABEL version="1.0"
LABEL description="React Frontend for the Library API"

WORKDIR /app

COPY ./package.json ./

RUN npm install -g nodemon

RUN npm install


COPY . .

RUN npm run build

FROM nginx
EXPOSE 3001
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html