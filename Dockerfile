FROM node:14.17.6-buster-slim

ENV APP $APP

WORKDIR /app
COPY ./src /app/
COPY ./docker-entrypoint.sh /app/
COPY ./Dockerfile /app/
COPY ./nest-cli.json /app/
COPY ./ormconfig.js /app/
COPY ./tsconfig.json /app/
COPY ./tsconfig.build.json /app/
COPY ./package.json /app/
RUN chmod +x /app/docker-entrypoint.sh
ENTRYPOINT ["/app/docker-entrypoint.sh"]