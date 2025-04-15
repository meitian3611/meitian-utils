/**
 * 日期工具函数
 */

/**
 * 格式化日期为指定格式
 * @param date 要格式化的日期
 * @param format 格式模板，如 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | number | string, format = 'YYYY-MM-DD'): string {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    throw new Error('无效的日期');
  }
  
  const replacements: Record<string, string> = {
    'YYYY': d.getFullYear().toString(),
    'MM': (d.getMonth() + 1).toString().padStart(2, '0'),
    'DD': d.getDate().toString().padStart(2, '0'),
    'HH': d.getHours().toString().padStart(2, '0'),
    'mm': d.getMinutes().toString().padStart(2, '0'),
    'ss': d.getSeconds().toString().padStart(2, '0'),
    'SSS': d.getMilliseconds().toString().padStart(3, '0')
  };
  
  return format.replace(/YYYY|MM|DD|HH|mm|ss|SSS/g, match => replacements[match]);
}

/**
 * 获取日期的开始时间（设置为当天 00:00:00）
 * @param date 日期对象
 * @returns 当天开始时间的日期对象
 */
export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * 获取日期的结束时间（设置为当天 23:59:59.999）
 * @param date 日期对象
 * @returns 当天结束时间的日期对象
 */
export function endOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * 计算两个日期之间的差异（天数）
 * @param dateLeft 第一个日期
 * @param dateRight 第二个日期
 * @returns 相差的天数
 */
export function differenceInDays(dateLeft: Date, dateRight: Date): number {
  const diffTime = Math.abs(dateLeft.getTime() - dateRight.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * 添加指定时间到日期
 * @param date 原始日期
 * @param amount 要添加的数量
 * @param unit 单位：'years'|'months'|'days'|'hours'|'minutes'|'seconds'
 * @returns 新的日期对象
 */
export function addTime(
  date: Date,
  amount: number,
  unit: 'years'|'months'|'days'|'hours'|'minutes'|'seconds'
): Date {
  const result = new Date(date);
  
  switch (unit) {
    case 'years':
      result.setFullYear(result.getFullYear() + amount);
      break;
    case 'months':
      result.setMonth(result.getMonth() + amount);
      break;
    case 'days':
      result.setDate(result.getDate() + amount);
      break;
    case 'hours':
      result.setHours(result.getHours() + amount);
      break;
    case 'minutes':
      result.setMinutes(result.getMinutes() + amount);
      break;
    case 'seconds':
      result.setSeconds(result.getSeconds() + amount);
      break;
  }
  
  return result;
}

/**
 * 检查日期是否在指定范围内
 * @param date 要检查的日期
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @returns 是否在范围内
 */
export function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
  const time = date.getTime();
  return time >= startDate.getTime() && time <= endDate.getTime();
}

/**
 * 检查日期是否是工作日（周一至周五）
 * @param date 要检查的日期
 * @returns 是否是工作日
 */
export function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

/**
 * 获取相对时间描述，如"刚刚"、"5分钟前"等
 * @param date 日期
 * @param baseDate 基准日期，默认为当前时间
 * @returns 相对时间描述
 */
export function getRelativeTimeDescription(date: Date, baseDate: Date = new Date()): string {
  const diff = baseDate.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  
  if (seconds < 60) return '刚刚';
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}分钟前`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}小时前`;
  
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}天前`;
  
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}个月前`;
  
  return `${Math.floor(months / 12)}年前`;
} 