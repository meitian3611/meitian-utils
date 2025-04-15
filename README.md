# Frontend Utils Library
- **基于Cursor IDE + claude3.7 自动生成的前端项目**

一个功能丰富的前端工具库，提供日期、文本、数字和数据格式处理的实用函数。

## 安装

```bash
# npm
npm install @meitian/utils

# yarn
yarn add @meitian/utils

# pnpm
pnpm add @meitian/utils
```

## 功能特点

- **日期处理**：格式化日期、日期计算、相对时间等
- **文本处理**：文本截断、命名格式转换、敏感信息掩码等
- **数字处理**：格式化数字、货币转换、精确计算等
- **数据处理**：深拷贝、对象扁平化、数组处理等

## 使用示例

### 日期处理

```typescript
import { formatDate, getRelativeTimeDescription } from '@meitian/utils';

// 格式化日期
console.log(formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')); // 2023-04-01 14:30:45

// 获取相对时间描述
console.log(getRelativeTimeDescription(new Date(Date.now() - 3600000))); // 1小时前
```

### 文本处理

```typescript
import { truncate, maskString, toCamelCase } from '@meitian/utils';

// 截断文本
console.log(truncate('这是一段很长的文本内容', 6)); // 这是一段很...

// 掩码处理敏感信息
console.log(maskString('13812345678')); // 138****5678

// 命名格式转换
console.log(toCamelCase('user_name')); // userName
```

### 数字处理

```typescript
import { formatNumber, formatCurrency, numberToChinese, preciseCalc } from '@meitian/utils';

// 格式化数字
console.log(formatNumber(12345.6789)); // 12,345.68

// 格式化货币
console.log(formatCurrency(12345.6789)); // ¥12,345.68

// 数字转中文大写金额
console.log(numberToChinese(12345.67)); // 壹万贰仟叁佰肆拾伍元陆角柒分

// 精确计算
console.log(preciseCalc.add(0.1, 0.2)); // 0.3
```

### 数据处理

```typescript
import { deepClone, getPropertyByPath, sortArrayByKey } from '@meitian/utils';

// 深拷贝对象
const obj = { user: { name: '张三', age: 30 } };
const cloned = deepClone(obj);

// 获取嵌套属性
console.log(getPropertyByPath(obj, 'user.name')); // 张三

// 按属性排序数组
const users = [{ name: '张三', age: 30 }, { name: '李四', age: 25 }];
console.log(sortArrayByKey(users, 'age')); // [{ name: '李四', age: 25 }, { name: '张三', age: 30 }]
```

## API 文档

### 日期工具 (date)

- `formatDate(date, format)`: 将日期格式化为指定格式的字符串
- `startOfDay(date)`: 获取日期的开始时间（00:00:00）
- `endOfDay(date)`: 获取日期的结束时间（23:59:59.999）
- `differenceInDays(dateLeft, dateRight)`: 计算两个日期之间的天数差异
- `addTime(date, amount, unit)`: 向日期添加指定时间
- `isDateInRange(date, startDate, endDate)`: 检查日期是否在指定范围内
- `isWeekday(date)`: 检查日期是否是工作日（周一至周五）
- `getRelativeTimeDescription(date, baseDate)`: 获取相对时间描述

### 文本工具 (text)

- `truncate(text, maxLength, ellipsis)`: 截断文本到指定长度
- `toCamelCase(text)`: 转换字符串为驼峰命名
- `toPascalCase(text)`: 转换字符串为帕斯卡命名
- `toSnakeCase(text)`: 转换字符串为下划线命名
- `toKebabCase(text)`: 转换字符串为中划线命名
- `capitalize(text)`: 首字母大写
- `strLength(text, countType)`: 计算字符串长度（支持中文等双字节字符）
- `stripHtml(html)`: 移除字符串中的HTML标签
- `isEmpty(text)`: 判断字符串是否为空
- `maskString(text, startVisible, endVisible, mask)`: 敏感信息掩码处理

### 数字工具 (number)

- `formatNumber(num, options)`: 格式化数字为千分位分隔的字符串
- `unFormatNumber(num)`: 将千分位分隔的字符串转换为数字
- `formatCurrency(amount, options)`: 格式化金额为货币字符串
- `numberToChinese(num)`: 将数字转换为中文大写金额
- `abbreviateNumber(num, digits)`: 将数字转换为指定数量级的简写
- `randomNumber(min, max, isInteger)`: 生成指定范围内的随机数
- `clamp(num, min, max)`: 将数字限制在指定范围内
- `preciseCalc`: 精确的浮点数运算对象
  - `add(a, b)`: 精确加法
  - `subtract(a, b)`: 精确减法
  - `multiply(a, b)`: 精确乘法
  - `divide(a, b)`: 精确除法
  - `round(a, decimals)`: 精确四舍五入

### 数据工具 (data)

- `deepClone(obj)`: 深拷贝对象
- `deepEqual(obj1, obj2)`: 深度比较两个对象是否相等
- `flattenObject(obj, prefix)`: 对象扁平化
- `getPropertyByPath(obj, path, defaultValue)`: 获取对象的嵌套属性值
- `setPropertyByPath(obj, path, value)`: 设置对象的嵌套属性值
- `removeFromArray(array, predicate)`: 从数组中移除指定元素
- `sortArrayByKey(array, key, order)`: 根据指定属性对对象数组进行排序
- `groupArrayByKey(array, key)`: 根据指定属性对对象数组进行分组
- `uniqueArray(array, key)`: 数组去重
- `range(start, end, step)`: 生成指定范围内的数字数组
- `safeParseJSON(jsonString, defaultValue)`: 安全地解析JSON字符串
- `getStorageItem(key, defaultValue)`: 安全地获取缓存数据
- `setStorageItem(key, value)`: 安全地存储数据到本地缓存

## 许可证

MIT 