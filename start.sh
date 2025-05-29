#!/bin/bash
echo "🚀 AI简历生成器 - 启动"
echo "正在打开欢迎页面..."
if command -v open &> /dev/null; then
    open landing.html
    echo "✅ 已在默认浏览器中打开"
elif command -v start &> /dev/null; then
    start landing.html
    echo "✅ 已在默认浏览器中打开"
elif command -v xdg-open &> /dev/null; then
    xdg-open landing.html
    echo "✅ 已在默认浏览器中打开"
else
    echo "请手动双击 landing.html 文件打开"
fi
echo "🎉 享受使用 AI简历生成器！"