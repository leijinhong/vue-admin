interface FlowPathType {
  id: number;
  event: 0 | 1 | 2 | 3 | 4 | 5 | string;
  level: number;
  reviewedBy: string;
  // 正在编辑
  editing: boolean;
}

interface SpanMethodProps {
  column: {
    property: string;
  };
  rowIndex: number;
  columnIndex: number;
}
