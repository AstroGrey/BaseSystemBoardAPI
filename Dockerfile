FROM node:14-alpine

WORKDIR /app

ADD . ./
RUN npm install
RUN npm run-script build

FROM node:14-alpine

WORKDIR /app
ENV HOST=0.0.0.0
ENV NODE_ENV=production

ADD tsconfig.json ./

COPY --from=0 ./app/package.json ./package.json
COPY --from=0 ./app/node_modules ./node_modules/
COPY --from=0 ./app/dist ./dist

EXPOSE 8080
ENTRYPOINT ["npm", "start"]