import React from 'react';
import {
    Box,
    Container
} from "@material-ui/core"
import useStyles from '../DefaultMakeStylesTheme'
import StreamsTable from '../streamlist/StreamsTable';

export default function StreamList(props) {
    const styles = useStyles();

    return (
        <Container>
            <Box class="headerArea">
                <div class="title">
                    Current Streams
                </div>
            </Box>
            <StreamsTable classes={styles} dataSource={props.dataSource} />
        </Container>
    );
}
