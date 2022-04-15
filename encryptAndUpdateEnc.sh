#!/usr/bin/env bash
sops -e .env > enc.env
