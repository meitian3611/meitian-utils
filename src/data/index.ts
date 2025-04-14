/**
 * 数据处理工具函数
 */

/**
 * 深拷贝对象
 * @param obj 要拷贝的对象
 * @returns 深拷贝后的对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // 处理 Date 对象
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }
  
  // 处理 RegExp 对象
  if (obj instanceof RegExp) {
    return new RegExp(obj) as any;
  }
  
  // 处理 Array 对象
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as any;
  }
  
  // 处理普通对象
  const clonedObj = {} as any;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone((obj as any)[key]);
    }
  }
  
  return clonedObj;
}

/**
 * 深度比较两个对象是否相等
 * @param obj1 第一个对象
 * @param obj2 第二个对象
 * @returns 是否相等
 */
export function deepEqual(obj1: any, obj2: any): boolean {
  // 基本类型或引用相同的情况
  if (obj1 === obj2) {
    return true;
  }
  
  // 其中一个为null或非对象的情况
  if (obj1 === null || obj2 === null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }
  
  // 处理 Date 对象
  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }
  
  // 处理 RegExp 对象
  if (obj1 instanceof RegExp && obj2 instanceof RegExp) {
    return obj1.toString() === obj2.toString();
  }
  
  // 比较对象的键数量
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) {
    return false;
  }
  
  // 递归比较每个属性
  for (const key of keys1) {
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
      return false;
    }
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  
  return true;
}

/**
 * 对象扁平化（将嵌套对象转为单层对象，键使用.连接）
 * @param obj 要扁平化的对象
 * @param prefix 键前缀，用于递归
 * @returns 扁平化后的对象
 */
export function flattenObject(obj: Record<string, any>, prefix: string = ''): Record<string, any> {
  const result: Record<string, any> = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key]) && !(obj[key] instanceof Date)) {
        Object.assign(result, flattenObject(obj[key], newKey));
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  
  return result;
}

/**
 * 获取对象的嵌套属性值（支持通过点路径访问）
 * @param obj 目标对象
 * @param path 属性路径，如 'user.address.city'
 * @param defaultValue 默认值，当属性不存在时返回
 * @returns 属性值或默认值
 */
export function getPropertyByPath<T = any>(obj: Record<string, any>, path: string, defaultValue?: T): T | undefined {
  if (!obj || !path) return defaultValue;
  
  const keys = path.split('.');
  let current: any = obj;
  
  for (let i = 0; i < keys.length; i++) {
    if (current === null || current === undefined) {
      return defaultValue;
    }
    
    current = current[keys[i]];
  }
  
  return (current !== undefined ? current : defaultValue) as T | undefined;
}

/**
 * 根据路径设置对象的嵌套属性值
 * @param obj 目标对象
 * @param path 属性路径，如 'user.address.city'
 * @param value 要设置的值
 * @returns 修改后的对象（引用不变）
 */
export function setPropertyByPath<T extends Record<string, any>>(obj: T, path: string, value: any): T {
  if (!obj || !path) return obj;
  
  const keys = path.split('.');
  let current: Record<string, any> = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    
    if (!current[key] || typeof current[key] !== 'object') {
      // 如果下一级是数字索引，则创建数组，否则创建对象
      const nextKey = keys[i + 1];
      const isNextKeyNumber = !isNaN(Number(nextKey)) && String(parseInt(nextKey)) === nextKey;
      current[key] = isNextKeyNumber ? [] : {};
    }
    
    current = current[key] as Record<string, any>;
  }
  
  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;
  
  return obj;
}

/**
 * 从数组中移除指定元素
 * @param array 目标数组
 * @param predicate 判断函数或要移除的元素值
 * @returns 移除后的新数组
 */
export function removeFromArray<T>(array: T[], predicate: ((item: T, index: number) => boolean) | T): T[] {
  if (!array || !array.length) return [];
  
  const newArray = [...array];
  
  if (typeof predicate === 'function') {
    const predicateFn = predicate as (item: T, index: number) => boolean;
    for (let i = newArray.length - 1; i >= 0; i--) {
      if (predicateFn(newArray[i], i)) {
        newArray.splice(i, 1);
      }
    }
  } else {
    const elementToRemove = predicate;
    for (let i = newArray.length - 1; i >= 0; i--) {
      if (newArray[i] === elementToRemove) {
        newArray.splice(i, 1);
      }
    }
  }
  
  return newArray;
}

/**
 * 根据指定属性对对象数组进行排序
 * @param array 要排序的数组
 * @param key 排序的键或键路径
 * @param order 排序顺序，'asc'升序，'desc'降序
 * @returns 排序后的新数组
 */
export function sortArrayByKey<T>(array: T[], key: string, order: 'asc' | 'desc' = 'asc'): T[] {
  if (!array || !array.length) return [];
  
  const compareFunction = (a: T, b: T): number => {
    const valueA = getPropertyByPath(a as any, key);
    const valueB = getPropertyByPath(b as any, key);
    
    if (valueA === valueB) return 0;
    if (valueA === undefined) return order === 'asc' ? 1 : -1;
    if (valueB === undefined) return order === 'asc' ? -1 : 1;
    
    const result = valueA < valueB ? -1 : 1;
    return order === 'asc' ? result : -result;
  };
  
  return [...array].sort(compareFunction);
}

/**
 * 根据指定属性对对象数组进行分组
 * @param array 要分组的数组
 * @param key 分组依据的键或键路径
 * @returns 分组后的对象
 */
export function groupArrayByKey<T>(array: T[], key: string): Record<string, T[]> {
  if (!array || !array.length) return {};
  
  return array.reduce((result: Record<string, T[]>, item: T) => {
    const value = getPropertyByPath(item as any, key);
    const groupKey = String(value === undefined ? 'undefined' : value);
    
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    
    result[groupKey].push(item);
    return result;
  }, {});
}

/**
 * 数组去重
 * @param array 要去重的数组
 * @param key 对象数组时，用于比较的键或键路径
 * @returns 去重后的新数组
 */
export function uniqueArray<T>(array: T[], key?: string): T[] {
  if (!array || !array.length) return [];
  
  if (!key) {
    return [...new Set(array)];
  }
  
  const seen = new Set();
  return array.filter(item => {
    const value = getPropertyByPath(item as any, key);
    const valueKey = String(value === undefined ? 'undefined' : value);
    
    if (seen.has(valueKey)) {
      return false;
    }
    
    seen.add(valueKey);
    return true;
  });
}

/**
 * 生成指定范围内的数字数组
 * @param start 起始值，包含
 * @param end 结束值，包含
 * @param step 步长，默认为1
 * @returns 数字数组
 */
export function range(start: number, end: number, step: number = 1): number[] {
  if (step === 0) {
    throw new Error('步长不能为0');
  }
  
  const isAscending = start <= end;
  
  if (isAscending && step < 0) {
    return [];
  }
  
  if (!isAscending && step > 0) {
    return [];
  }
  
  const result: number[] = [];
  
  if (isAscending) {
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i >= end; i += step) {
      result.push(i);
    }
  }
  
  return result;
}

/**
 * 安全地解析JSON字符串
 * @param jsonString JSON字符串
 * @param defaultValue 解析失败时的默认值
 * @returns 解析结果或默认值
 */
export function safeParseJSON<T = any>(jsonString: string, defaultValue: T | null = null): T | null {
  try {
    return jsonString ? (JSON.parse(jsonString) as T) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

/**
 * 在保证类型安全的情况下，安全地获取缓存数据
 * @param key 缓存键
 * @param defaultValue 默认值
 * @returns 解析后的缓存数据或默认值
 */
export function getStorageItem<T>(key: string, defaultValue: T | null = null): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

/**
 * 安全地存储数据到本地缓存
 * @param key 缓存键
 * @param value 要存储的值
 * @returns 是否成功存储
 */
export function setStorageItem(key: string, value: any): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
} 