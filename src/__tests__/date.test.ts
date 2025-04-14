import { 
  formatDate, 
  startOfDay, 
  endOfDay, 
  differenceInDays,
  addTime,
  isDateInRange,
  isWeekday,
  getRelativeTimeDescription
} from '../date';

describe('日期工具函数测试', () => {
  describe('formatDate', () => {
    test('格式化日期为YYYY-MM-DD格式', () => {
      const date = new Date(2023, 0, 1); // 2023-01-01
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2023-01-01');
    });

    test('格式化日期为自定义格式', () => {
      const date = new Date(2023, 0, 1, 14, 30, 45, 123);
      expect(formatDate(date, 'YYYY/MM/DD HH:mm:ss')).toBe('2023/01/01 14:30:45');
    });

    test('处理无效日期应该抛出错误', () => {
      expect(() => formatDate('invalid date')).toThrow('无效的日期');
    });
  });

  describe('startOfDay', () => {
    test('设置日期为当天开始时间', () => {
      const date = new Date(2023, 0, 1, 14, 30, 45);
      const result = startOfDay(date);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });
  });

  describe('endOfDay', () => {
    test('设置日期为当天结束时间', () => {
      const date = new Date(2023, 0, 1, 14, 30, 45);
      const result = endOfDay(date);
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });
  });

  describe('differenceInDays', () => {
    test('计算两个日期之间的天数差异', () => {
      const date1 = new Date(2023, 0, 1);
      const date2 = new Date(2023, 0, 10);
      expect(differenceInDays(date1, date2)).toBe(9);
    });
  });

  describe('addTime', () => {
    test('添加天数到日期', () => {
      const date = new Date(2023, 0, 1);
      const result = addTime(date, 5, 'days');
      expect(result.getDate()).toBe(6);
    });

    test('添加月份到日期', () => {
      const date = new Date(2023, 0, 1);
      const result = addTime(date, 2, 'months');
      expect(result.getMonth()).toBe(2); // 0-based index, 2 = March
    });
  });

  describe('isDateInRange', () => {
    test('检查日期是否在指定范围内', () => {
      const date = new Date(2023, 0, 5);
      const startDate = new Date(2023, 0, 1);
      const endDate = new Date(2023, 0, 10);
      expect(isDateInRange(date, startDate, endDate)).toBe(true);

      const outOfRangeDate = new Date(2023, 0, 15);
      expect(isDateInRange(outOfRangeDate, startDate, endDate)).toBe(false);
    });
  });

  describe('isWeekday', () => {
    test('周一至周五返回true', () => {
      // 2023-01-02 是周一
      const monday = new Date(2023, 0, 2);
      expect(isWeekday(monday)).toBe(true);
    });

    test('周六周日返回false', () => {
      // 2023-01-01 是周日
      const sunday = new Date(2023, 0, 1);
      expect(isWeekday(sunday)).toBe(false);
    });
  });

  describe('getRelativeTimeDescription', () => {
    test('相对时间描述', () => {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 3600000);
      expect(getRelativeTimeDescription(oneHourAgo, now)).toBe('1小时前');
    });
  });
}); 