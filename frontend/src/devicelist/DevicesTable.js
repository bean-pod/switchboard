import React from 'react';
import {
    Box,
    Table,
    TableHead,
    TableRow,
    TableContainer,
    TableBody,
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
                                <HeadCells />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.rows.map((row) => {
                                return <SingleTableRow key={row.id} deviceDetails={row} />;
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </React.Fragment>
    );
}
