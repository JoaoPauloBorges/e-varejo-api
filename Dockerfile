FROM node:15.10.0-alpine3.11
#Build
WORKDIR /code

COPY ./package.json /code
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "run", "startProd"]
