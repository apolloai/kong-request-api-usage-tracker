FROM node:10-alpine as production-dependencies
WORKDIR /usr/src/app
COPY package.json yarn.lock /usr/src/app/
RUN yarn install --production

FROM node:10-alpine as build-dependencies
WORKDIR /usr/src/app
COPY package.json yarn.lock /usr/src/app/
RUN yarn install

# build stage
FROM node:10-alpine AS build
WORKDIR /usr/src/app
COPY --from=build-dependencies /usr/src/app/node_modules node_modules
COPY package.json tsconfig.json /usr/src/app/
COPY src/ /usr/src/app/src
RUN yarn run build


# web container
FROM node:10-alpine
WORKDIR /usr/src/app

COPY --from=production-dependencies /usr/src/app .
COPY --from=build /usr/src/app/dist /usr/src/app/dist

CMD ["yarn", "start"]
