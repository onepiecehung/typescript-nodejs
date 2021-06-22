pm2 start ./dist/bin/www.js --name server_api --max-memory-restart 1G -i 3 --node-args="-r ts-node/register/transpile-only -r tsconfig-paths/register"

pm2 start ./dist/workers/start.worker.js --name worker --max-memory-restart 600M -i 3 --node-args="-r ts-node/register/transpile-only -r tsconfig-paths/register"