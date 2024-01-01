import { UserResponse } from '../../axios';
import { useTheme } from '../../hooks/useTheme';
import { TableHeadLabel } from '../../utils/table';

interface TableHeadProps {
  rowOrder: Array<string>;
  headLabels: Map<string, TableHeadLabel<UserResponse>>;
  additionalColumns?: number;
}

const TableHead: React.FC<TableHeadProps> = ({
  headLabels,
  rowOrder,
  additionalColumns,
}) => {
  const { getColorClasses } = useTheme();
  const secondary = getColorClasses('secondary');
  return (
    <thead>
      <tr>
        {rowOrder.map((row) => {
          const columnData = headLabels.get(row);
          return (
            <th
              key={columnData?.id}
              className={
                secondary +
                ' font-semibold text-left p-3 border-b border-gray-300'
              }
              style={{ textAlign: 'left' }}
              scope="col"
            >
              {columnData?.label}
            </th>
          );
        })}
        {additionalColumns &&
          Array.from({ length: additionalColumns }, (_, k) => (
            <th
              key={`additional-${k}`}
              className={`${secondary} font-semibold p-3 border-b border-gray-300`}
              style={{ textAlign: 'right' }}
              scope="col"
            />
          ))}
      </tr>
    </thead>
  );
};
export default TableHead;
