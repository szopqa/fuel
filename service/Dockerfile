FROM node:carbon

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ADD ./package.json /usr/src/app/package.json

ADD . /usr/src/app

RUN npm install

RUN npm i -g nodemon

EXPOSE 3000

CMD ["npm", "start"]