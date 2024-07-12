#!/bin/bash

set -e

# Create App folder and copy content
cp -r ../web3vault ~/.local/bin/web3vault

# Create a Desktop entry
cp web3vault.desktop ~/.local/share/applications/web3vault.desktop

