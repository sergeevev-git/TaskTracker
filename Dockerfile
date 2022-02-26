#stage 1
FROM node:15 as client

WORKDIR /app/client

COPY client/package.json /app/client/

RUN npm install

COPY client /app/client/

RUN npm run build
#stage 2
FROM node:15 as server

WORKDIR /app

COPY server/package.json /app

RUN npm install

COPY server /app
#stage 3
COPY --from=client /app/client/build /app/client

EXPOSE 5000

CMD ["npm", "start"]