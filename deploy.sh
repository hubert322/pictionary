git status
read -p "Files to add: " files
git add $files
read -p "Commit message: " commitMessage
git commit -m "${commitMessage}"
git push

cd static
npm run deploy
cd ../
