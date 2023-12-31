import UsersTable from '../../../Components/Table/UsersTable';
import { useTheme } from '../../../hooks/useTheme';
import Card from '../../../layout/Card';

const PayScales = () => {
  const { getColorClasses, getStyles } = useTheme();
  const secondary = getColorClasses('secondary');
  const pageTitle = getStyles('pageTitle');

  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 mt-8">
        <div className="flex justify-between px-4">
          <div className={`${pageTitle} ${secondary}`}>Users</div>
          <div>Test</div>
        </div>
        <Card overrideClasses="px-0 max-w-full w-full h-fit p-4 shadow-md rounded-lg">
          <UsersTable />
        </Card>
      </div>
    </>
  );
};

export default PayScales;
