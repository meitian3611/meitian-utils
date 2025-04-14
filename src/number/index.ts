/**
 * 数字工具函数
 */

/**
 * 格式化数字为千分位分隔的字符串
 * @param num 要格式化的数字
 * @param options 格式化选项
 * @returns 格式化后的字符串
 */
export function formatNumber(
  num: number,
  options: {
    decimalPlaces?: number;
    decimalSeparator?: string;
    thousandSeparator?: string;
  } = {}
): string {
  const {
    decimalPlaces = 2,
    decimalSeparator = '.',
    thousandSeparator = ','
  } = options;
  
  if (isNaN(num)) return '0';
  
  // 处理小数位数
  const fixed = num.toFixed(decimalPlaces);
  const [intPart, decimalPart] = fixed.split('.');
  
  // 添加千分位分隔符
  const formattedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  
  // 如果有小数部分，则添加小数分隔符
  if (decimalPart && parseInt(decimalPart) !== 0) {
    return formattedIntPart + decimalSeparator + decimalPart;
  }
  
  // 如果小数部分全为0，则返回整数部分
  return decimalPlaces > 0 && parseInt(decimalPart) === 0 ? formattedIntPart : formattedIntPart;
}

/**
 * 格式化金额为货币字符串
 * @param amount 金额数值
 * @param options 格式化选项
 * @returns 格式化后的货币字符串
 */
export function formatCurrency(
  amount: number,
  options: {
    currency?: string;
    locale?: string;
    position?: 'before' | 'after';
    decimalPlaces?: number;
  } = {}
): string {
  const {
    currency = '¥',
    position = 'before',
    decimalPlaces = 2,
    locale = 'zh-CN'
  } = options;
  
  try {
    // 使用Intl API格式化货币
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency === '¥' ? 'CNY' : currency,
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces
    }).format(amount);
  } catch (error) {
    // 降级处理，手动格式化
    const formattedNumber = formatNumber(amount, { decimalPlaces });
    return position === 'before' ? `${currency}${formattedNumber}` : `${formattedNumber}${currency}`;
  }
}

/**
 * 将数字转换为中文大写金额
 * @param num 要转换的数字
 * @returns 中文大写金额字符串
 */
export function numberToChinese(num: number): string {
  if (isNaN(num)) return '';
  
  if (num === 0) return '零元整';
  
  const digitCN = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unitCN = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟', '兆'];
  const moneyCN = ['分', '角', '元', '整'];
  
  let result = '';
  let negative = false;
  
  // 处理负数
  if (num < 0) {
    negative = true;
    num = Math.abs(num);
  }
  
  // 处理小数部分
  const decimalPart = Math.round((num % 1) * 100);
  const integerPart = Math.floor(num);
  
  // 处理小数
  if (decimalPart > 0) {
    if (decimalPart % 10 > 0) {
      result = digitCN[decimalPart % 10] + moneyCN[0];
    }
    if (Math.floor(decimalPart / 10) > 0) {
      result = digitCN[Math.floor(decimalPart / 10)] + moneyCN[1] + result;
    }
  }
  
  // 处理整数部分
  if (integerPart > 0) {
    let intStr = integerPart.toString();
    let len = intStr.length;
    
    for (let i = 0; i < len; i++) {
      const digit = parseInt(intStr[i]);
      const unit = unitCN[len - 1 - i];
      
      if (digit !== 0) {
        result = result + digitCN[digit] + unit;
      } else {
        if (i === len - 1) continue;
        if (intStr[i + 1] !== '0') {
          result = result + digitCN[0];
        }
      }
    }
    
    result = result + moneyCN[2];
  }
  
  // 整数部分为0，小数部分为0
  if (integerPart === 0 && decimalPart === 0) {
    result = '零元整';
  }
  
  // 整数部分不为0，小数部分为0
  if (integerPart > 0 && decimalPart === 0) {
    result = result + moneyCN[3];
  }
  
  return negative ? `负${result}` : result;
}

/**
 * 将数字转换为指定数量级的简写
 * @param num 要转换的数字
 * @param digits 保留的小数位数
 * @returns 简写后的字符串
 */
export function abbreviateNumber(num: number, digits: number = 1): string {
  if (isNaN(num)) return '0';
  
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';
  
  if (absNum < 1000) return sign + absNum.toString();
  
  const units = ['', 'K', 'M', 'B', 'T', 'P', 'E'];
  const decimal = 1000;
  
  const exponent = Math.min(Math.floor(Math.log(absNum) / Math.log(decimal)), units.length - 1);
  const abbreviatedValue = absNum / Math.pow(decimal, exponent);
  
  return sign + abbreviatedValue.toFixed(digits) + units[exponent];
}

/**
 * 生成指定范围内的随机数
 * @param min 最小值，包含
 * @param max 最大值，包含
 * @param isInteger 是否返回整数，默认true
 * @returns 随机数
 */
export function randomNumber(min: number, max: number, isInteger: boolean = true): number {
  if (min > max) {
    [min, max] = [max, min];
  }
  
  if (isInteger) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return Math.random() * (max - min) + min;
  }
}

/**
 * 将数字限制在指定范围内
 * @param num 要限制的数字
 * @param min 最小值
 * @param max 最大值
 * @returns 限制后的数字
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/**
 * 精确的浮点数运算（解决JS浮点数精度问题）
 */
export const preciseCalc = {
  /**
   * 精确加法
   */
  add(a: number, b: number): number {
    const precisionA = (a.toString().split('.')[1] || '').length;
    const precisionB = (b.toString().split('.')[1] || '').length;
    const precision = Math.max(precisionA, precisionB);
    const multiplier = Math.pow(10, precision);
    return Math.round(a * multiplier + b * multiplier) / multiplier;
  },
  
  /**
   * 精确减法
   */
  subtract(a: number, b: number): number {
    return this.add(a, -b);
  },
  
  /**
   * 精确乘法
   */
  multiply(a: number, b: number): number {
    const precisionA = (a.toString().split('.')[1] || '').length;
    const precisionB = (b.toString().split('.')[1] || '').length;
    const precision = precisionA + precisionB;
    const multiplier = Math.pow(10, precision);
    return Math.round(a * multiplier) * Math.round(b * multiplier) / Math.pow(10, 2 * precision);
  },
  
  /**
   * 精确除法
   */
  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('除数不能为零');
    }
    const precisionA = (a.toString().split('.')[1] || '').length;
    const precisionB = (b.toString().split('.')[1] || '').length;
    const precision = precisionA + precisionB;
    const multiplier = Math.pow(10, precision);
    return (a * multiplier) / (b * multiplier);
  },
  
  /**
   * 四舍五入到指定小数位
   */
  round(a: number, decimals: number = 0): number {
    const multiplier = Math.pow(10, decimals);
    return Math.round(a * multiplier) / multiplier;
  }
}; 