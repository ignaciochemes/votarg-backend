#!/bin/bash
cd /app
npm install --production
npm run typeorm:${APP} migration:run
npm run start:${APP}