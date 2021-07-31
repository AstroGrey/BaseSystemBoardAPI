FROM node:14-alpine as builder

WORKDIR /app

ADD . ./
RUN npm install
RUN npm run-script build

FROM node:14-alpine

WORKDIR /app
ENV HOST=0.0.0.0
ENV NODE_ENV=production

ADD tsconfig.json ./

COPY --from=builder ./app/package.json ./package.json
COPY --from=builder ./app/node_modules ./node_modules/
COPY --from=builder ./app/dist ./dist

EXPOSE $PORT
CMD ["npm", "start"]