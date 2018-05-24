FROM node:8.11.1

ARG server_uid

RUN apt-get update && apt-get install -y \
    sudo

# UID пользователя
RUN usermod -u $server_uid node && groupmod -g $server_uid node

ADD scripts/ /scripts/

RUN npm install nodemon -g

EXPOSE 5000
