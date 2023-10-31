FROM node:18
RUN apt-get -y update

WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
COPY .eslintrc.js ./

# copy source code to /app/src folder
COPY src /app/src

RUN npm install
RUN npm run build

EXPOSE 3001

CMD ["npm run start"]