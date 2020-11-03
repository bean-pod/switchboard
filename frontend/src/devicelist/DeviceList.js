import React from 'react';
import {
    Box,
    Container,
    makeStyles
} from "@material-ui/core"

import TitleBox from './TitleBox'
import ContentsTable from './ContentsTable'
import DynamicBreadcrumb from '../Breadcrumb';

export default function DeviceList(props) {
    const styles = useStyles();

    return (
        <Container>
            <DynamicBreadcrumb breadcrumbs={["Home", "Devices"]} />
            <Box padding="1em">
                <TitleBox />
                <ContentsTable classes={styles} dataSource={props.dataSource} />
            </Box>
        </Container>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));