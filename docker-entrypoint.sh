#!/usr/bin/env bash
cd /app
npm install
npm run typeorm:${APP} migration:run
npm run start:${APP}