#
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
# docker build -u "app" -t lennonjesus/linkar-api .
#
#
#
# docker run \
#   -e "NODE_ENV=production" \
#   -u "app" \
#   -m "300M" --memory-swap "1G" \
#   -w "/api/linkar/" \
#   --name "linkar-rest-api" \
#   node [script]
#


FROM node:argon

# Add our user and group first to make sure their IDs get assigned consistently
RUN groupadd -r app && useradd -r -g app app

# Create app directory
RUN mkdir -p /api/linkar/
WORKDIR /api/linkar/

# Install app dependencies
COPY package.json /api/linkar/
#RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080

CMD [ "npm", "start" ]
#CMD [ "node", "bin/www" ]
