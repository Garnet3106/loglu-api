FROM ubuntu:latest

ENV APP_ROOT=/app

WORKDIR $APP_ROOT

COPY . ./

RUN apt-get update \
    && apt-get install -y nodejs npm curl \
    && npm i -g n \
    && n stable \
    && npm install \
    && npx prisma generate \
    && npm run build

CMD ["bash", "-c", "chmod +x ./deploy/startup.sh && ./deploy/startup.sh"]
