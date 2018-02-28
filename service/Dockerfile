FROM node:carbon

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

RUN npm i -g nodemon

EXPOSE 3000

CMD ["npm", "start"]