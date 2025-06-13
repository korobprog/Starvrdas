#!/bin/bash

# Проверяем, есть ли уже настройки nvm в .bashrc
if ! grep -q "NVM_DIR" ~/.bashrc; then
    echo "Добавляем настройки nvm в .bashrc..."
    
    # Добавляем настройки nvm в .bashrc
    cat >> ~/.bashrc << 'EOF'

# NVM setup
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
EOF

    echo "Настройки nvm добавлены в .bashrc"
    echo "Чтобы применить изменения, выполните: source ~/.bashrc"
    echo "После этого команда 'npm run dev' будет работать напрямую"
else
    echo "Настройки nvm уже присутствуют в .bashrc"
    echo "Если команда 'npm' все еще не работает, выполните: source ~/.bashrc"
fi