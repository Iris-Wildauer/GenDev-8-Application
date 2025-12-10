FROM node:20-alpine

WORKDIR /app/api/bff/widgets/insurance

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]