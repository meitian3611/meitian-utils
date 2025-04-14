/**
 * 文本工具函数
 */

/**
 * 截断文本到指定长度，并添加省略号
 * @param text 原始文本
 * @param maxLength 最大长度
 * @param ellipsis 省略号符号，默认为"..."
 * @returns 截断后的文本
 */
export function truncate(text: string, maxLength: number, ellipsis: string = '...'): string {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + ellipsis;
}

/**
 * 转换字符串为驼峰命名
 * @param text 原始文本，可以是下划线或中划线格式
 * @returns 驼峰格式的字符串
 */
export function toCamelCase(text: string): string {
  return text.replace(/[-_]([a-z])/g, (_, char) => char.toUpperCase());
}

/**
 * 转换字符串为帕斯卡命名（首字母大写的驼峰命名）
 * @param text 原始文本
 * @returns 帕斯卡格式的字符串
 */
export function toPascalCase(text: string): string {
  const camelCase = toCamelCase(text);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

/**
 * 转换字符串为下划线命名
 * @param text 原始文本
 * @returns 下划线格式的字符串
 */
export function toSnakeCase(text: string): string {
  return text
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '')
    .replace(/[-\s]+/g, '_');
}

/**
 * 转换字符串为中划线命名
 * @param text 原始文本
 * @returns 中划线格式的字符串
 */
export function toKebabCase(text: string): string {
  return text
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
    .replace(/[_\s]+/g, '-');
}

/**
 * 首字母大写
 * @param text 原始文本
 * @returns 首字母大写的文本
 */
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * 计算字符串长度（支持中文等双字节字符）
 * @param text 要计算的字符串
 * @param countType 计算类型：'char'(字符)或'byte'(字节)
 * @returns 字符串长度
 */
export function strLength(text: string, countType: 'char' | 'byte' = 'char'): number {
  if (!text) return 0;
  
  if (countType === 'char') {
    return text.length;
  } else {
    // 假设中文字符占用2个字节
    let byteLength = 0;
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128) {
        byteLength += 1;
      } else {
        byteLength += 2;
      }
    }
    return byteLength;
  }
}

/**
 * 移除字符串中的HTML标签
 * @param html 包含HTML标签的字符串
 * @returns 移除HTML标签后的纯文本
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
}

/**
 * 判断字符串是否为空（null、undefined或空字符串）
 * @param text 要检查的字符串
 * @returns 是否为空
 */
export function isEmpty(text: string | null | undefined): boolean {
  return text === null || text === undefined || text.trim() === '';
}

/**
 * 格式化为掩码字符串，常用于手机号、身份证等敏感信息处理
 * @param text 原文本
 * @param startVisible 开头保留明文的字符数
 * @param endVisible 结尾保留明文的字符数
 * @param mask 掩码字符，默认为*
 * @returns 掩码处理后的字符串
 */
export function maskString(
  text: string,
  startVisible: number = 3,
  endVisible: number = 4,
  mask: string = '*'
): string {
  if (!text) return '';
  
  const length = text.length;
  
  // 处理字符串过短的情况
  if (length <= startVisible + endVisible) {
    return text;
  }
  
  const start = text.substring(0, startVisible);
  const end = text.substring(length - endVisible);
  const maskLength = length - startVisible - endVisible;
  const maskPart = mask.repeat(maskLength);
  
  return start + maskPart + end;
} 