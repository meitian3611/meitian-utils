# 变更日志

所有项目的显著变化都将记录在这个文件中。

## [1.0.2] - 2024-04-15

### 新增
- 数字工具模块
  - `unformatNumber`: 移除千分位格式

### 优化

- 数字工具模块
  - 优化了`formatNumber`函数的千分位处理

## [1.0.0] - 2025-04-14

### 新增

- 日期工具模块
  - `formatDate`: 格式化日期为指定格式
  - `startOfDay`: 获取日期的开始时间
  - `endOfDay`: 获取日期的结束时间
  - `differenceInDays`: 计算两个日期之间的天数差异
  - `addTime`: 添加指定时间到日期
  - `isDateInRange`: 检查日期是否在指定范围内
  - `isWeekday`: 检查日期是否是工作日
  - `getRelativeTimeDescription`: 获取相对时间描述

- 文本工具模块
  - `truncate`: 截断文本到指定长度
  - `toCamelCase`: 转换字符串为驼峰命名
  - `toPascalCase`: 转换字符串为帕斯卡命名
  - `toSnakeCase`: 转换字符串为下划线命名
  - `toKebabCase`: 转换字符串为中划线命名
  - `capitalize`: 首字母大写
  - `strLength`: 计算字符串长度（支持中文等双字节字符）
  - `stripHtml`: 移除字符串中的HTML标签
  - `isEmpty`: 判断字符串是否为空
  - `maskString`: 敏感信息掩码处理

- 数字工具模块
  - `formatNumber`: 格式化数字为千分位分隔的字符串
  - `formatCurrency`: 格式化金额为货币字符串
  - `numberToChinese`: 将数字转换为中文大写金额
  - `abbreviateNumber`: 将数字转换为指定数量级的简写
  - `randomNumber`: 生成指定范围内的随机数
  - `clamp`: 将数字限制在指定范围内
  - `preciseCalc`: 精确的浮点数运算对象

- 数据工具模块
  - `deepClone`: 深拷贝对象
  - `deepEqual`: 深度比较两个对象是否相等
  - `flattenObject`: 对象扁平化
  - `getPropertyByPath`: 获取对象的嵌套属性值
  - `setPropertyByPath`: 设置对象的嵌套属性值
  - `removeFromArray`: 从数组中移除指定元素
  - `sortArrayByKey`: 根据指定属性对对象数组进行排序
  - `groupArrayByKey`: 根据指定属性对对象数组进行分组
  - `uniqueArray`: 数组去重
  - `range`: 生成指定范围内的数字数组
  - `safeParseJSON`: 安全地解析JSON字符串
  - `getStorageItem`: 安全地获取缓存数据
  - `setStorageItem`: 安全地存储数据到本地缓存 