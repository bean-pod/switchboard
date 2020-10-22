import React from 'react';
import {
    Container,
    withStyles
} from "@material-ui/core"

import TitleBox from './TitleBox'
import ContentsTable from './ContentsTable'

class DeviceList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container>
                <TitleBox />
                <ContentsTable classes={this.props.classes} />
            </Container>
        );
    }
}

const useStyles = (theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
});

export default withStyles(useStyles)(DeviceList)