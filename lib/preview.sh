 ## windows自动部署脚本
#  ./pscp.exe -l feuser -pw "7j8k9l0;" -r build 10.152.81.208:/usr/local/nginx/html/qql.zhushou.sogou.com/code/static/
#  ./pscp.exe -l leonali -pw leonali /d/www/ad-show/dist/showtime.js 10.148.44.175:/search/leonali/finalhaoqq/frontend/build/js/
 #./pscp.exe -l leonali -pw leonali /d/www/ad-show/dist/showtime.js 10.148.44.175:/search/leonali/daohangqq/resource/views/scripts/

## mac自动部署命令  
# scp -r  /Users/alive/project/2018/ad-show/dist/showtime.js leonali@10.148.44.175:/search/leonali/finaldhqq/frontend/build/js/
# scp -r  /Users/alive/project/2018/ad-show/dist/showtime.js leonali@10.148.44.175:/search/leonali/finalhaoqq/frontend/build/js/

# scp -r build root@10.152.81.208:/usr/local/nginx/html/qql.zhushou.sogou.com/code/static/
# 8k9l0;-'


## 合并主分支
echo "部署开始"
./pscp.exe -l root -pw "8k9l0;-'" -r build 10.152.81.208:/usr/local/nginx/html/qql.zhushou.sogou.com/code/static/
echo "部署结束"

# ./pscp.exe -l root -pw "8k9l0;-'" -r build 10.152.81.208:/usr/local/nginx/html/mobile.zhushou.sogou.com/site/html/redpackage/