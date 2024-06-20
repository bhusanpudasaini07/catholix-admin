FROM node:18 as build-deps
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm i
RUN pnpm run build
CMD ["pnpm", "start"]
