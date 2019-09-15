# 湖北工业大学冰蓝工作室官方小程序

## 目录描述(介绍主要目录)
```
- cloudfunctions: 存放小程序云函数
  - addUser: 小程序云函数，用于将用户提交的报名信息存储进小程序云数据库中
  - getUser: 小程序云函数，用于获取用户提交的报名申请信息
- doc: 项目文档信息
  - material_img: 存放项目的UI设计搞，以及会用到的icon和png图片
  - readme_img: 存放项目readme文件中用到的图片
- miniprogram:
  - images: 项目用到的图片信息
  - pages: 
    - index: 小程序主页，介绍冰蓝工作室
    - join: 填写报名表页面
```

## 小程序部署
1. 小程序部署即在**微信开发者工具**中上传小程序。
2. 因为上传小程序会把整个目录下所有文件(共12M)都进行上传，而规定上传小程序大小不得超过2M，所以在上传之前将`doc`目录删除(包括`doc`下的子目录文件)，因为`doc`目录是为了给开发者提供素材的目录，与小程序无关。
3. 由于小程序的appid机制，所以在下载本项目后，要先修改`project.config.json`中的appid为你自己的appid才能运行项目。

## 效果预览
![index页面](https://images.gitee.com/uploads/images/2019/0818/115827_d5690324_1602984.png)

![index页面](https://images.gitee.com/uploads/images/2019/0818/115631_ad0234e6_1602984.png)

![index页面](https://images.gitee.com/uploads/images/2019/0818/115813_2d037c7b_1602984.png)

![join页面](https://images.gitee.com/uploads/images/2019/0818/115750_80246aaa_1602984.png)

