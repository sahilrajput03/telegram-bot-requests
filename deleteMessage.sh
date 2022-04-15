#!/usr/bin/env bash

# Getting secrets
source .env

# Enable Debugger
set -x

curl -X POST \
	-H "Content-Type: application/json" \
	-d @<(cat <<EOF 
{ "chat_id": "$TELEGRAM_CHAT_ID_DHANUR", "message_id": 212}
EOF) \
	"https://api.telegram.org/bot$DWK_TOKEN/deleteMessage" \

# https://github.com/nats-io/nats.js

## You can delete messages sent withing first 48hrs only
# https://github.com/python-telegram-bot/python-telegram-bot/wiki/Frequently-Asked-Questions#can-my-bot-delete-messages-from-the-user-in-a-private-chat
