#!/bin/bash
masterBranch="fes-stylelint"
isCommit(){
    status=$(git status)  
    addStatus=`echo $status | grep "Changes not staged for commit:"`
    commitStatus=`echo $status | grep "Changes to be committed:"`

    
    if [[ "$addStatus" != "" || "$commitStatus" != "" ]]
    then        
        return 1
    fi
    return 0
}


echo "填写部署分支名称: "
read version

echo "切换分支开始"
git checkout $version
echo "切换分支结束"

status=$(git status)  
addStatus=`echo $status | grep "Changes not staged for commit:"`
commitStatus=`echo $status | grep "Changes to be committed:"`
    
if [[ "$addStatus" != "" || "$commitStatus" != "" ]] 
then 
    echo "分支有未提交的代码"

    echo "是否提交当前分支？yes or no"
    read isCommitBrance
    if [ $isCommitBrance == "yes" ]
    then 
       
        echo "这个修改了什么？"    
        read content
        echo "提交代码开始"

        git pull
        git add .
        git commit -am $content
        git push -u origin $version
        echo "提交代码结束"
    fi
fi

echo "是否合并到主分支？yes or no"
read isMerge

if [ $isMerge == "yes" ]
then
    echo "切换到主分支"
    git checkout $masterBranch
    
    megerMaster=$(git merge $version)
    index=`expr index "$megerMaster" "CONFLICT"`
    
    if [ $index != 0 ]
    then
        echo "合并${version}分支有冲突,请手动处理冲突"
        echo "是否处理完毕？yes or no"
        read isFininsh
        if [ "$isFinish" == "yes" ]
        then        
            echo "开始构建代码"
        fi
    fi    
fi
