#!/bin/bash

# Инициализация nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

# Запуск npm с переданными аргументами
npm "$@"