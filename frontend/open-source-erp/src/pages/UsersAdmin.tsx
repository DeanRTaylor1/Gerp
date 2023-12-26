import Card from "../layout/Card";
import { useTheme } from "../hooks/useTheme";
import UsersTable from "../Components/Table/UsersTable";




const UsersAdmin = () => {
    const { getColorClasses, getStyles } = useTheme();
    const secondary = getColorClasses('secondary');
    const pageTitle = getStyles('pageTitle');

    return (
        <>
            <div className="w-full h-full flex flex-col gap-4 mt-8">
                <div className={pageTitle + " " + secondary}>Users</div>
                <Card className="px-0">
                    <UsersTable />
                </Card>
            </div>
        </>
    );
};

export default UsersAdmin