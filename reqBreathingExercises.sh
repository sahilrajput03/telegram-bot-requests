#!/usr/bin/env bash

# Getting secrets
source .env


# ENABLE MONITORING:
# echo Sending $text to ratan @ $(date) >> /tmp/ratan-log.txt


text="Release DMT via 10 minutes breathing exercise [@ youtube, time stamped](https://youtu.be/lwlEJ2O-6HM?list=LL&t=350)"

echo  Thought is: $text

# Enable Debugger
# set -x

# Earlier, I was using, "parse_mode": "HTML".
# Send to Sahil
curl -sX POST \
	-H "Content-Type: application/json" \
	-d @<(cat <<EOF 
{ "chat_id": "$CHAT_ID_SAHIL", "text": "$text", "parse_mode": "MarkdownV2" }
EOF) \
	"https://api.telegram.org/bot$BRUNO_TOKEN/sendMessage" | ( [ -n "$ss" ] && jq || cat ) 

# LEARN: CONDITIONAL PIPING, src: https://unix.stackexchange.com/a/38311/504112

## FYI: TO SIMULATE WITH SS VARIABLE AS EMPTY YOU CAN DO:
# ss= ./reqBreathingExercises.sh

# CHECK IF ITS MY LOCAL MACHINE
# [ -n "$ss" ] && echo yes its my local machine

# LEARN: From `man test`,
# -n:  the length of STRING is nonzero

# Send to Ratan
# curl -X POST \
# 	-H "Content-Type: application/json" \
# 	-d @<(cat <<EOF 
# { "chat_id": "$CHAT_ID_RATAN", "text": "$text", "parse_mode": "HTML" }
# EOF) \
# 	"https://api.telegram.org/bot$BRUNO_TOKEN/sendMessage"
