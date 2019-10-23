# 代码构建
npm run build

# 脚本部署
echo "部署开始"
./pscp.exe -l root -pw "8k9l0;-'" -r build 10.152.81.208:/usr/local/nginx/html/qql.zhushou.sogou.com/code/static/
echo "部署结束"
echo "点击打开 http://qql.zhushou.sogou.com/static/build/index.html"

