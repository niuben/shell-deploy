echo "1. 产品版本号 ?"
echo "2. 临时需求请使用小版本号，比如当前版本是v1.0, 临时版本则是v1.0.1"


echo "请填写版本号？"
read verson 

master="fes-stylelint"
echo "切换到主分支上"
git checkout $master
echo "切换到主分支结束"

echo "创建${verson}分支号"
git branch $verson

echo "切换${verson}分支号"
git checkout $verson

git add -A
git commit -am "create branch"
git push origin $version
