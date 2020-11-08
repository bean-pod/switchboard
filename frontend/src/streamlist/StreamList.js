import React from 'react';
import {
    Box,
    Container
} from "@material-ui/core"
import useStyles from '../DefaultMakeStylesTheme'
import StreamsTable from '../streamlist/StreamsTable';

export default function StreamList(props) {
    return (
        <Container>
            <Box class="headerArea">
                <div class="title">
                    Current Streams
                </div>
            </Box>
            <StreamsTable classes={useStyles} dataSource={props.dataSource} />
        </Container>
    );
}
