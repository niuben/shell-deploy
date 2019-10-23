echo "是否上线？yes or no"
read isOnline

if [ $isOnline == "yes" ]
then 
    # 合并主分支代码
    echo "提交主分支代码"
    git pull
    git add .    
    git commit -am "merge"
    git push origin $masterBranch
        
    echo "提交到后端项目"
    
    ## 丽娟的路径
    cp -rf ./build D:/sogou-projects/qql.zhushou.sogou.com/code/static
    cd D:/sogou-projects/qql.zhushou.sogou.com/code/static

    git pull
    git add .
    git commit -m "前端上线-$(date +%s)"
    git push

    ## 提交后端路径 牛犇的路径
    cp -rf ./build D:/www/qql/code/static
    cd D:/www/qql/code/static

    git pull
    git add .
    git commit -m "前端上线-$(date +%s)"
    git push   

    echo "提交结束"    
    sleep 4
fi

echo "切换回原始分支"
git checkout $version
echo "结束"