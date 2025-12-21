FROM node:20-alpine

WORKDIR /app/api/bff/widgets/vacation

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8084

EXPOSE 8084

CMD ["npm", "start"]