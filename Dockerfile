FROM node:12.3.0-alpine
WORKDIR '/app'
COPY ./package.json .
RUN npm install
COPY . .
WORKDIR '/app/client'
RUN npm install && npm run build
WORKDIR '/app'
CMD ["npm","run","start"]
