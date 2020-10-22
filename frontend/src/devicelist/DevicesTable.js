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

export default class DevicesTable extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <Box>
                    <TableContainer style={{ maxHeight: 500 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell class="tableHeadCell lightestGrey" style={{ width: 1, padding: 0, paddingLeft: 5 }}></TableCell>
                                    <HeadCells />
                                    <TableCell class="tableHeadCell lightestGrey" align="center"><Typography variant="caption">Actions</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.rows.map((row) => {
                                    return <SingleTableRow row={row} />;
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </React.Fragment>
        );
    }
}
