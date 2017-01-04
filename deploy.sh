#!/bin/sh
rm -rf ./app;
webpack -p;
scp -r ./app root@60.205.183.125:/var/