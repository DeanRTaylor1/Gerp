import React from 'react';
import { useTheme } from '../../hooks/useTheme';

interface TableRowProps {
  children?: React.ReactNode;
  rowOrder: Array<string>;
  rowData: RowData;
  selected: boolean;
  handleClick: () => void;
}

export type RowData = Map<string, TableBodyItem>;
export type TableBodyType = 'image' | 'string' | 'number' | 'date';

export interface TableBodyItem {
  name: string;
  value: string;
  type: TableBodyType;
}

const TableRow: React.FC<TableRowProps> = ({
  children,
  rowOrder,
  rowData,
  selected,
  handleClick,
}) => {
  const { getStyles } = useTheme();
  const tableRowHover = getStyles('tableRowHover');

  const renderData = (data: TableBodyItem) => {
    switch (data.type) {
      case 'image':
        return (
          <td className="p-3 align-center">
            <img
              src={data.value as string}
              alt={data.name}
              className="rounded-full h-12 w-12 object-cover inline-block"
            />
          </td>
        );
      case 'string':
      case 'number':
        return <td className="p-3 align-center">{data.value}</td>;
      case 'date':
        return (
          <td className="p-3 align-center">
            {new Date(data.value as string).toLocaleDateString('en-UK')}
          </td>
        );
      default:
        return <td className="p-3 align-center">-</td>;
    }
  };

  return (
    <tr
      onClick={handleClick}
      className={`${
        selected ? 'selected-row' : 'border-b border-gray-300'
      } ${tableRowHover} h-14`}
    >
      {rowOrder.map((rowName) => {
        const data = rowData.get(rowName);
        return data ? (
          renderData(data)
        ) : (
          <td className="p-3 align-center">-</td>
        );
      })}
      {children}
    </tr>
  );
};

export default TableRow;
