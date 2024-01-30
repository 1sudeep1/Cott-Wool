import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, Pagination } from "@nextui-org/react";
import { useSelector } from "react-redux";


const columns = [
    { name: "NAME", uid: 'fullName' },
    { name: "EMAIL", uid: "email" },
    { name: "PHONE", uid: "phone" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];

const statusColorMap = {
    online: "success",
    offline: "danger",
};

const Customers = (props) => {

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatar }}
                        name={cellValue}
                    >
                    </User>
                );
            case "email":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm ">{cellValue}</p>
                    </div>
                );
            case "phone":
                return (
                    <Chip color={statusColorMap[user.phone]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "status":
                return (
                    <Chip color={statusColorMap[user.status]} size="sm" variant="flat">
                        {userDetails._id===user._id? 'online': 'offline'}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                {/* <EyeIcon /> */}View
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                {/* <EditIcon /> */}Edit
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                {/* <DeleteIcon /> */}Delete
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    //This is client side pagination//
    
    // const [page, setPage] = React.useState(1);
    // const rowsPerPage = 5;

    // const pages = Math.ceil(props.users.length / rowsPerPage);

    // const items = React.useMemo(() => {
    //     const start = (page - 1) * rowsPerPage;
    //     const end = start + rowsPerPage;

    //     return props.users.slice(start, end);
    // }, [page, props.users]);

    const {userDetails}= useSelector(state=>state.user)

    return (
        <>
            <Table isStriped aria-label="Example table with custom cells" className='table-auto'

                bottomContent={
                    <div className="flex w-full justify-center">
                        {/* <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        /> */}
                    </div>
                }

            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={props.users}>
                    {(item) => (
                        <TableRow key={item}>
                            {(columnKey) => <TableCell className={props.usersId===userDetails._id? 'bg-gray-500 font-semibold text-white':null}>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default Customers