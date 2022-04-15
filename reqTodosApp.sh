#!/usr/bin/env bash

# Getting secrets
source .env

# Enable Debugger
set -x

curl -X POST \
	-H "Content-Type: application/json" \
	-d @<(cat <<EOF 
{ "chat_id": "$TELEGRAM_CHAT_ID_DWK", "text": "hello", "parse_mode": "HTML" }
EOF) \
	"https://api.telegram.org/bot$TELEGRAM_ACCESS_TOKEN_DWK/sendMessage" \

# https://github.com/nats-io/nats.js

