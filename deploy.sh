# !/bin/bash


echo "mudando para a branch de produção\n"

git checkout -B gh-pages

echo "Fazendo build do projeto"

npm run build

echo "build feito\n"

# git add -A

echo "\n\nFazendo o merge da branch 'main'\n\n"

git merge main

git add .

echo "\n\nCommitando mudanças\n"

git commit -m 'deploy'

echo "\n\nEnviando alterações para a produção\n"

git push 

git checkout main "Voltando para a branch main"
