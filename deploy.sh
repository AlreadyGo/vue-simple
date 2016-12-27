#!/bin/sh
rm -rf ./app;
webpack;
scp -r ./app root@188.166.242.162:/var/