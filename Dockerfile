FROM node:alpine
COPY ./ ./
RUN npm install
CMD ["node", "backend/src/app.js", "--config", "config.prod.yaml"]