#!/usr/bin/env bash

# Getting secrets
source .env

# GET A THOUGHT
while [[ -z $text ]] ; do
	text=$(shuf /home/array/Documents/github_repos/sahilrajput03/thoughts-principles.md -n1 | grep '.')
done

echo  Thought is: $text

# ENABLE MONITORING:
# echo Sending $text to ratan @ $(date) >> /tmp/ratan-log.txt

# Enable Debugger
# set -x


# Send to Sahil
curl -X POST \
	-H "Content-Type: application/json" \
	-d @<(cat <<EOF 
{ "chat_id": "$CHAT_ID_SAHIL", "text": "$text", "parse_mode": "HTML" }
EOF) \
	"https://api.telegram.org/bot$BRUNO_TOKEN/sendMessage"


# Send to Ratan
# curl -X POST \
# 	-H "Content-Type: application/json" \
# 	-d @<(cat <<EOF 
# { "chat_id": "$CHAT_ID_RATAN", "text": "$text", "parse_mode": "HTML" }
# EOF) \
# 	"https://api.telegram.org/bot$BRUNO_TOKEN/sendMessage"


