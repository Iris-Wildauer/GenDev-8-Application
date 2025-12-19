FROM node:20-alpine

WORKDIR /app/api/bff/widgets/media-service

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8082

EXPOSE 8082

CMD ["npm", "start"]