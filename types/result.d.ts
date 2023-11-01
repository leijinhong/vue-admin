/**
 * 接口返回类型
 * 还需增加 code
 * 接口返回类型
 */
interface ResultType<T> {
  code: 0 | 1;
  data: T;
  msg: string;
}

interface ResultDataType<T> {
  items: T;
  total: number;
}
