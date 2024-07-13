#!/bin/bash

set -e

# Generate a DID with w3up JS CLI
w3 key create > /tmp/did

cat /tmp/did | tail -1 > private.key
did=$(cat /tmp/did | head -1)
did=${did:2}
echo "DID: $did"

# Generate a space with w3up JS CLI
w3 space create $(openssl rand -base64 15)
# Delegate capabilities to your DID
w3 delegation create -c 'store/*' -c 'upload/*' $did -o proof.ucan

