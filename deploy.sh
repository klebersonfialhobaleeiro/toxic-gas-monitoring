
# !/bin/bash

echo "Buildando arquido"

npm run build

echo "build feito\n"

echo "mudando de branch\n"

git checkout -B gh-pages

# git add -A
git merge main

echo "fazendo commit\n"

git add .

git commit -m 'deploy'

echo "fazendo o push\n"

git push 
