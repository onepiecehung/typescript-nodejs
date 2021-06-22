#!/bin/bash

npm run build

docker build -f Dockerfile.prod -t backend_ts_prod:1.0.0 .

exit
