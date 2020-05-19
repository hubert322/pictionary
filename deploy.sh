git status
read -p "Files to add: " files
read -p "Commit message: " commitMessage

cd static && npm run build
cd ../
git add $files
git commit -m "${commitMessage}"
git push
