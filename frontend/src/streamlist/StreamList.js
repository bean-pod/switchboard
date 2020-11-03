import React from 'react';
import {
    Box,
    Container
} from "@material-ui/core"
import useStyles from '../DefaultMakeStylesTheme'
import StreamsTable from './StreamsTable'

export default function StreamList() {
    const styles = useStyles();

    return (
        <Container>
            <Box class="headerArea">
                <div class="title">
                    Current Streams
                </div>
            </Box>
            <StreamsTable />
        </Container>
    );
}
