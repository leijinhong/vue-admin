import { utils, writeFile } from "xlsx";

/**
 * @description 导出钩子
 * @param       columns   - table的规则 
 * @param       data      - 列表数据
 * @attention   注意事项  -  这里不会做数据转换，data数据是什么就导出什么数据，不会判断什么1和2
 * 
 * [
 *    ['id','name','sex'],
 *    ['0' ,'小美','2'],
 *    ['1' ,'小明','1'],
 * ]
 */
const useExecl = (columns: TableColumnList, data: any[], fileName = 'AOLIAN') => {
  // 过滤掉slot为"operation"或type为"selection"的列
  const filteredColumns = columns.filter(column => !column.slot && column.type !== "selection");

  // 提取表头标题
  const headers = filteredColumns.map(column => column.label);

  // 提取数据
  const processedData = data.map(item => {
    return filteredColumns.map(column => {
      const prop = column.prop;
      if (prop) {
        // 处理嵌套属性
        const props = (prop as string).split('.');
        let value = item;
        for (const p of props) {
          value = value[p];
        }
        return value;
      } else {
        return '';
      }
    });
  });

  // 合并表头和数据
  const result = [headers, ...processedData];

  // 调用xlsx插件导出
  const workSheet = utils.aoa_to_sheet(result);
  const workBook = utils.book_new();
  utils.book_append_sheet(workBook, workSheet, "数据报表");
  writeFile(workBook, `${fileName}.xlsx`);
}


export default useExecl