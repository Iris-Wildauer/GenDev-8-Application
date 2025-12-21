FROM node:20-alpine

WORKDIR /app/api/bff/widgets/internet

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8081

EXPOSE 8081

CMD ["npm", "start"]