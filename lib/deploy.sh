#!/bin/bash

dir=$(ls -l ./fe-deploy/previews | awk '/^d/ {print $NF}')

display(){
  for i in $*
  do
      echo -e "\033[33;32m $i \033[0m"
  done
}

echo "已存在的项目："
display $dir
echo "项目类型？"
echo "1: 新项目"
echo "2: 老项目"
read isNew


echo -e "\033[33;40m 如果是如下某个项目请输入其文件夹名；若是新项目请输入与如下不同的文件夹名：\033[0m"
display $dir

filename=""

validate(){
  read filename
  isOld=1
  if [ -z $filename ]
  then
  echo '不能为空，请重新输入：'
  validate $*
  return
  fi
  for i in $*
  do
    if [[ $i = $filename && isNew -eq 1 ]]
    then
      echo -e "\033[33;32m 输入的名字 $filename 已存在, 请重新输入：\033[0m"
      validate $*
      break;
    fi
    if [[ $i = $filename && isNew -eq 2 ]]
    then
      isOld=2
      break;
    fi
  done
  if [[ isNew -eq 2 && isOld -ne 2 ]]
  then
  echo "请输入如果是如下某个项目请输入其文件夹名："
  display $dir
  validate $*
  fi
  filename=$filename
}
validate $dir

dest=./fe-deploy/previews/$filename

copy(){
  cp -rf ./fe-deploy/config_deploy $1/config
  cp -rf ./build $1
  cp -rf ./app.config.js $1
 ./node_modules/.bin/babel $1/app.config.js -o $1/app.config.js
  if [ -e ./src/api ]
  then
  cp -rf ./src/api $1
  fi
}

if [ $isNew -eq 1 ]
then
mkdir $dest
fi

copy $dest

cd ./fe-deploy
git pull
git add .
git commit -m "$filename-$(date +%s)"
git push -u origin master

curl -d "$filename-$(date +%s)" http://10.134.76.170:8888/deploy
