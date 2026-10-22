#!/bin/bash
git add .
echo -n "Enter commit message: "
read commit_message
if [ -z "$commit_message" ]; then
  echo "💔 Cannot be empty. Aborting."
  exit 1
fi
git commit -m "🔄 ${commit_message}"
git push
