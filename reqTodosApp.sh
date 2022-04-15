#!/usr/bin/env bash

# Getting secrets
source .env

# Enable Debugger
set -x

curl -X POST \
	-H "Content-Type: application/json" \
	-d @<(cat <<EOF 
{ "chat_id": "$CHAT_ID_DWK", "text": "hello", "parse_mode": "HTML" }
EOF) \
	"https://api.telegram.org/bot$DWK_TOKEN/sendMessage" \

# https://github.com/nats-io/nats.js

