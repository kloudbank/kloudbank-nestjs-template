## declare base image - node 16
FROM node:16.16.0-alpine3.16 AS build
# Create app directory
WORKDIR /usr/src/app

### env config
ENV NODE_ENV=dev

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
