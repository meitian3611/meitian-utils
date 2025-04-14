# 发布指南

本文档提供了将前端工具库发布到npm并通过GitHub进行维护的详细步骤。

## 发布到npm

### 准备工作

1. 如果您没有npm账号，请先在[npm官网](https://www.npmjs.com/)注册一个账号。

2. 在本地登录npm账号：
   ```bash
   npm login
   ```
   按提示输入用户名、密码和邮箱。

3. 确保您的`package.json`文件中的包名称是唯一的。可以在npm官网搜索确认是否已经存在同名包。

4. 确保您的包符合npm的质量标准：
   - 检查代码质量：`npm run lint`
   - 运行测试：`npm test`
   - 构建项目：`npm run build`

### 发布流程

1. 更新版本号（使用语义化版本控制）：
   ```bash
   # 更新补丁版本 (1.0.0 -> 1.0.1)
   npm version patch

   # 更新次要版本 (1.0.0 -> 1.1.0)
   npm version minor

   # 更新主要版本 (1.0.0 -> 2.0.0)
   npm version major
   ```

2. 发布到npm：
   ```bash
   npm publish
   ```

3. 验证发布：
   - 访问 `https://www.npmjs.com/package/@meitian/utils` 确认包已发布
   - 在测试项目中安装并测试：`npm install @meitian/utils`

### 发布新版本

1. 进行代码修改
2. 更新版本号
3. 更新CHANGELOG.md记录变更内容
4. 运行测试确保一切正常
5. 发布到npm

## GitHub仓库维护

### 初始设置

1. 在GitHub上创建新仓库：`@meitian/utils`

2. 将本地代码推送到GitHub：
   ```bash
   git init
   git add .
   git commit -m "初始提交"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/@meitian/utils.git
   git push -u origin main
   ```

3. 配置GitHub Actions自动化流程：
   - 测试工作流已配置在 `.github/workflows/test.yml`
   - 发布工作流已配置在 `.github/workflows/publish.yml`

4. 添加npm token到GitHub仓库：
   - 在npm网站生成访问令牌：访问个人设置 -> 访问令牌 -> 生成新令牌
   - 在GitHub仓库设置 -> Secrets -> Actions -> 添加新密钥
   - 名称为 `NPM_TOKEN`，值为刚生成的npm访问令牌

### 版本发布流程

1. 完成代码更改并提交

2. 在GitHub上创建新release：
   - 访问仓库 -> Releases -> Create a new release
   - 创建新标签，如 `v1.0.1`
   - 填写更新说明
   - 发布release

3. GitHub Actions将自动触发发布工作流，将包发布到npm

## 常见问题排查

### npm发布问题

- **包名称已存在**：修改`package.json`中的包名称，确保唯一性
- **版本号未更新**：确保每次发布前更新版本号
- **发布权限问题**：检查npm登录状态和权限设置

### GitHub Actions问题

- **工作流失败**：检查日志，修复相关问题
- **NPM_TOKEN无效**：更新GitHub Secrets中的token
- **测试失败**：修复测试后重新提交

## 持续维护

1. 定期更新依赖：`npm update`
2. 响应用户反馈和问题
3. 添加新功能并发布更新版本
4. 维护文档和示例
5. 检查并合并有价值的贡献者PR 