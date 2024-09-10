FROM node:latest

WORKDIR /app

# 拷贝全部到工作目录
COPY . /app

RUN npm install
# 端口
EXPOSE 8080

# 添加环境参数
ENV MY_ENV = webkubor

CMD npm run start

# 构建命令
# docker image build -t myegg:v1.0.0 .

# 在后台运行，在本地8088打开
# docker run -p 8088:8080 -d  myegg:v1.0.0

#