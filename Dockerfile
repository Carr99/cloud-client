FROM node:16.13.2
ENV NODE_ENV=production

WORKDIR /cloud-client
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "index.js" ]