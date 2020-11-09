import React from 'react';
import {
    Box,
    Table,
    TableHead,
    TableRow,
    TableContainer,
    TableBody,
} from "@material-ui/core"
import HeadCells from './HeadCells'
import SingleStreamRow from './SingleStreamRow'

export default class StreamsTable extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            streams: []
        }
        this.dataSource = props.dataSource;
        this.handleStreamsChange = this.handleStreamsChange.bind(this);
    }

    componentDidMount() {
        this.dataSource.getAllStreams(this.handleStreamsChange);
    }

    handleStreamsChange(streams) {
        this.setState({
            streams: streams
        });
    }

    render() {
        return (
            <React.Fragment>
                <Box>
                <TableContainer style={{ maxHeight: 450 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <HeadCells />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.streams.map((row) => {
                                return <SingleStreamRow key={row.id} row={row} />;
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            </React.Fragment>
        );
    }
}