import React from 'react';
import {
    Container,
    makeStyles
} from "@material-ui/core"

import TitleBox from './TitleBox'
import ContentsTable from './ContentsTable'

export default function DeviceList(props) {
    const styles = useStyles();
    
    return (
        <Container>
            <TitleBox />
            <ContentsTable classes={styles} dataSource={props.dataSource}/>
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