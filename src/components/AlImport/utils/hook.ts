import ExportSvg from "../svg/export.svg?component";
import ImportSvg from "../svg/import.svg?component";

export const useHook = () => {
  const rows = [
    {
      icon: ExportSvg,
      title: "填写导入数据信息",
      desc: "请按照数据模板的格式准备导入数据，模板中的表头数据名称不能更改，且不可删除表头行",
      btnTxt: "下载模版",
      btnFn: handleExport
    },
    {
      icon: ImportSvg,
      title: "上传填好的信息表",
      desc: "文件名后缀必须是.elsx或者.xls(即Excel格式)，文件大小不得超过10M,最多支持500条数据",
      btnTxt: "上传文件",
      btnFn: handleUpload
    }
  ];

  function handleExport() {
    alert("点击下载");
  }
  function handleUpload() {
    alert("点击上传");
  }
  return { rows };
};
