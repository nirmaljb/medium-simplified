FROM node:20-bookworm

WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install
RUN npm install -g wrangler

RUN npm install @cloudflare/workerd-linux-arm64

COPY . .

EXPOSE 8787

CMD ["npm", "run", "dev"]

