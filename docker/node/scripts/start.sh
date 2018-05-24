#!/usr/bin/env bash
cd /web/www/
npm install

cd /web/www/client/
npm install

npm run build

cd /web/www
npm start
