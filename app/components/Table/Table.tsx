import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/react";

export function Table(){
    return(
        <Table>
            <TableHeader>
                <TableColumn>CAR</TableColumn>
                <TableColumn>Situação</TableColumn>
                <TableColumn>Proriedade de</TableColumn>
            </TableHeader>
        </Table>
    );
}