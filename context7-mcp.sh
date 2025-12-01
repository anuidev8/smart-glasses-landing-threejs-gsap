#!/bin/bash
export CONTEXT7_API_KEY="ctx7sk-146fdc3e-5362-4dd9-a9c4-f464fbc12f99"
export CLIENT_IP_ENCRYPTION_KEY="default-key-for-local-development"
exec /opt/homebrew/bin/npx -y @upstash/context7-mcp@latest --transport stdio
