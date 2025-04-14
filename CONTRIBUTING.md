# 贡献指南

感谢您考虑为前端工具库做出贡献！以下是一些帮助您开始的指南。

## 开发环境设置

1. Fork 这个仓库
2. 克隆你的 fork 到本地
   ```bash
   git clone https://github.com/YOUR_USERNAME/@meitian/utils.git
   cd @meitian/utils
   ```
3. 安装依赖
   ```bash
   npm install
   ```
4. 创建一个新分支
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 开发流程

1. 确保您的代码符合我们的代码风格，可以运行 `npm run lint` 检查
2. 为您的新功能添加测试，运行 `npm test` 确保所有测试通过
3. 提交代码并推送到您的 fork
   ```bash
   git add .
   git commit -m "feat: 添加了新功能"
   git push origin feature/your-feature-name
   ```
4. 提交 Pull Request

## 提交规范

我们使用语义化提交消息，格式如下：

```
<类型>: <描述>

[可选的正文]

[可选的页脚]
```

类型包括：
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档修改
- `style`: 不影响代码含义的更改（空格、格式、缺少分号等）
- `refactor`: 既不修复 bug 也不添加功能的代码更改
- `perf`: 提高性能的代码更改
- `test`: 添加或修正测试
- `chore`: 对构建过程或辅助工具和库的更改

## 代码规范

- 所有代码必须通过 TypeScript 类型检查
- 所有函数应该有明确的参数和返回类型
- 代码注释应该使用 JSDoc 格式
- 公共 API 应该有充分的文档说明

## 测试

- 为所有新功能编写测试
- 确保测试覆盖率保持在较高水平

## 许可证

通过贡献，您同意您的贡献将根据项目的 MIT 许可证获得许可。 