FROM node:12

WORKDIR /usr/src/app

ENV PORT 3000
ENV HOST 0.0.0.0

COPY package.*json ./

RUN yarn install --pure-lockfile --non-interactive --production

COPY . ./

RUN yarn run build

CMD yarn run start