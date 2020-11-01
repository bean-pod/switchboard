import React from 'react';
import {
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
    TableBody,
    Typography
} from "@material-ui/core"

import SingleTableRow from './SingleTableRow'
import HeadCells from './HeadCells'

export default function DevicesTable(props) {
    return (
        <React.Fragment>
            <Box>
                <TableContainer style={{ maxHeight: 500 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell class="tableHeadCell lightestGrey" style={{ width: 1, padding: 0, paddingLeft: 5 }}></TableCell>
                                <HeadCells />
                                <TableCell class="tableHeadCell lightestGrey" align="center"><Typography variant="caption">Actions</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.rows.map((row) => {
                                return <SingleTableRow row={row} />;
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </React.Fragment>
    );
}
