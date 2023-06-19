FROM node:18-alpine

WORKDIR /src
COPY package.json yarn.lock ./

RUN yarn

COPY . .
EXPOSE 4000

CMD ["yarn", "start"]