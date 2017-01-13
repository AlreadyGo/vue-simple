#!/bin/sh
rm -rf ./dist;
npm run build;
scp -r ./dist root@60.205.183.125:/var/