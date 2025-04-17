# Frontend Utils Library

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/@meitian/utils?color=brightgreen)](https://www.npmjs.com/package/@meitian/utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/meitian3611)

</div>

<div align="center">
  <p>
    <span style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; border-radius: 8px; color: white; margin: 0 10px; font-weight: bold; border: 1px solid #43A047; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <img src="https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/us.svg" width="22" height="14" style="vertical-align: middle; margin-right: 5px; position: relative; top: -1px;"> English
    </span>
    <a href="README.md" style="display: inline-block; padding: 10px 20px; background-color: #f8f9fa; border-radius: 8px; text-decoration: none; color: #333; margin: 0 10px; font-weight: bold; border: 1px solid #ddd; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.3s ease;">
      <img src="https://cdn.jsdelivr.net/gh/hampusborgos/country-flags@main/svg/cn.svg" width="22" height="14" style="vertical-align: middle; margin-right: 5px; position: relative; top: -1px;"> 中文
    </a>
  </p>
</div>

<div align="center">
  <strong>Frontend project automatically generated based on Cursor IDE + claude3.7</strong>
</div>
<br/>

<div align="center">A feature-rich frontend utility library providing useful functions for date, text, number, and data format processing.</div>

<br/>

## 📑 Table of Contents

- [✨ Features](#-features)
- [📦 Installation](#-installation)
- [🔨 Usage Examples](#-usage-examples)
  - [📅 Date Processing](#-date-processing)
  - [📝 Text Processing](#-text-processing)
  - [🔢 Number Processing](#-number-processing)
  - [📊 Data Processing](#-data-processing)
- [📚 API Documentation](#-api-documentation)
  - [📅 Date Utils](#-date-utils-date)
  - [📝 Text Utils](#-text-utils-text)
  - [🔢 Number Utils](#-number-utils-number)
  - [📊 Data Utils](#-data-utils-data)
- [📄 License](#-license)

## ✨ Features

- **📅 Date Processing**: Format dates, date calculations, relative times, etc.
- **📝 Text Processing**: Text truncation, naming format conversion, sensitive information masking, etc.
- **🔢 Number Processing**: Format numbers, currency conversion, precise calculations, etc.
- **📊 Data Processing**: Deep copy, object flattening, array operations, etc.

## 📦 Installation

```bash
# npm
npm install @meitian/utils

# yarn
yarn add @meitian/utils

# pnpm
pnpm add @meitian/utils
```

## 🔨 Usage Examples

### 📅 Date Processing

```typescript
import { formatDate, getRelativeTimeDescription } from '@meitian/utils';

// Format date
console.log(formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')); // 2023-04-01 14:30:45

// Get relative time description
console.log(getRelativeTimeDescription(new Date(Date.now() - 3600000))); // 1 hour ago
```

### 📝 Text Processing

```typescript
import { truncate, maskString, toCamelCase } from '@meitian/utils';

// Truncate text
console.log(truncate('This is a very long text content', 10)); // This is a...

// Mask sensitive information
console.log(maskString('13812345678')); // 138****5678

// Convert naming format
console.log(toCamelCase('user_name')); // userName
```

### 🔢 Number Processing

```typescript
import { formatNumber, formatCurrency, numberToChinese, preciseCalc } from '@meitian/utils';

// Format numbers
console.log(formatNumber(12345.6789)); // 12,345.68

// Format currency
console.log(formatCurrency(12345.6789)); // ¥12,345.68

// Convert number to Chinese uppercase amount
console.log(numberToChinese(12345.67)); // 壹万贰仟叁佰肆拾伍元陆角柒分

// Precise calculation
console.log(preciseCalc.add(0.1, 0.2)); // 0.3
```

### 📊 Data Processing

```typescript
import { deepClone, getPropertyByPath, sortArrayByKey } from '@meitian/utils';

// Deep clone objects
const obj = { user: { name: 'John', age: 30 } };
const cloned = deepClone(obj);

// Get nested properties
console.log(getPropertyByPath(obj, 'user.name')); // John

// Sort array by key
const users = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
console.log(sortArrayByKey(users, 'age')); // [{ name: 'Jane', age: 25 }, { name: 'John', age: 30 }]
```

## 📚 API Documentation

### 📅 Date Utils (date)

| Function Name | Description |
| ------------- | ----------- |
| `formatDate(date, format)` | Format date to a string with specified format |
| `startOfDay(date)` | Get the start time of the date (00:00:00) |
| `endOfDay(date)` | Get the end time of the date (23:59:59.999) |
| `differenceInDays(dateLeft, dateRight)` | Calculate the difference in days between two dates |
| `addTime(date, amount, unit)` | Add specified time to a date |
| `isDateInRange(date, startDate, endDate)` | Check if a date is within a specified range |
| `isWeekday(date)` | Check if a date is a weekday (Monday to Friday) |
| `getRelativeTimeDescription(date, baseDate)` | Get relative time description |

### 📝 Text Utils (text)

| Function Name | Description |
| ------------- | ----------- |
| `truncate(text, maxLength, ellipsis)` | Truncate text to specified length |
| `toCamelCase(text)` | Convert string to camelCase |
| `toPascalCase(text)` | Convert string to PascalCase |
| `toSnakeCase(text)` | Convert string to snake_case |
| `toKebabCase(text)` | Convert string to kebab-case |
| `capitalize(text)` | Capitalize the first letter |
| `strLength(text, countType)` | Calculate string length (supporting double-byte characters like Chinese) |
| `stripHtml(html)` | Remove HTML tags from string |
| `isEmpty(text)` | Check if a string is empty |
| `maskString(text, startVisible, endVisible, mask)` | Process sensitive information with mask |

### 🔢 Number Utils (number)

| Function Name | Description |
| ------------- | ----------- |
| `formatNumber(num, options)` | Format number to a string with thousands separators |
| `unFormatNumber(num)` | Convert a string with thousands separators to a number |
| `formatCurrency(amount, options)` | Format amount to currency string |
| `numberToChinese(num)` | Convert number to Chinese uppercase amount |
| `abbreviateNumber(num, digits)` | Convert number to abbreviated format with specified magnitude |
| `randomNumber(min, max, isInteger)` | Generate random number within specified range |
| `clamp(num, min, max)` | Restrict number within specified range |

**preciseCalc**: Object for precise floating-point calculations

| Method Name | Description |
| ----------- | ----------- |
| `add(a, b)` | Precise addition |
| `subtract(a, b)` | Precise subtraction |
| `multiply(a, b)` | Precise multiplication |
| `divide(a, b)` | Precise division |
| `round(a, decimals)` | Precise rounding |

### 📊 Data Utils (data)

| Function Name | Description |
| ------------- | ----------- |
| `deepClone(obj)` | Deep clone an object |
| `deepEqual(obj1, obj2)` | Deeply compare if two objects are equal |
| `flattenObject(obj, prefix)` | Flatten an object |
| `getPropertyByPath(obj, path, defaultValue)` | Get nested property value of an object |
| `setPropertyByPath(obj, path, value)` | Set nested property value of an object |
| `removeFromArray(array, predicate)` | Remove specified elements from array |
| `sortArrayByKey(array, key, order)` | Sort object array by specified property |
| `groupArrayByKey(array, key)` | Group object array by specified property |
| `uniqueArray(array, key)` | Remove duplicates from array |
| `range(start, end, step)` | Generate an array of numbers within specified range |
| `safeParseJSON(jsonString, defaultValue)` | Safely parse JSON string |
| `getStorageItem(key, defaultValue)` | Safely get data from cache |
| `setStorageItem(key, value)` | Safely store data to local cache |

## 📄 License

[MIT](LICENSE) © M 