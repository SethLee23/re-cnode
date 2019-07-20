#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 打包
yarn build

# 上传到github
git add .
git commit -m'打包'
git pull
git push

# 上传到分支
git subtree push --prefix dist origin gh-pages


# cd -