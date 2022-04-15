#!/usr/bin/env bash

# Getting secrets
source .env

# getting a thought:
_home=/home/array # Did coz I'll source this file in sudo as well.
# awesomeness rocks!
while [[ -z $text ]] ; do
	text=$(shuf $_home/Documents/github_repos/sahilrajput03/thoughts-principles.md -n1 | grep '.')
done

echo  text is: $text

echo Sending $text to ratan @ $(date) >> /tmp/ratan-log.txt

# Enable Debugger
set -x

# curl -X POST \
# 	-H "Content-Type: application/json" \
# 	-d @<(cat <<EOF 
# { "chat_id": "$TELEGRAM_CHAT_ID_RATAN", "text": "$text", "parse_mode": "HTML" }
# EOF) \
# 	"https://api.telegram.org/bot$TELEGRAM_ACCESS_TOKEN/sendMessage"


curl -X POST \
	-H "Content-Type: application/json" \
	-d @<(cat <<EOF 
{ "chat_id": "$TELEGRAM_CHAT_ID_SAHIL", "text": "$text", "parse_mode": "HTML" }
EOF) \
	"https://api.telegram.org/bot$TELEGRAM_ACCESS_TOKEN/sendMessage"

