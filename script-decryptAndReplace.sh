#!/usr/bin/env bash
sops -d enc.env > .env
