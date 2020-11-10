import React from 'react';
import {
    Box,
    Container
} from "@material-ui/core"

import TitleBox from './TitleBox'
import ContentsTable from './ContentsTable'
import DynamicBreadcrumb from '../General/DynamicBreadcrumb';
import * as useStyles from '../DefaultMakeStylesTheme';

export default class DeviceListPage extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Container>
                <DynamicBreadcrumb breadcrumbs={[["Home", ""], ["My Devices", "Devices"]]} />
                <Box padding="1em">
                    <TitleBox />
                    <ContentsTable classes={useStyles} dataSource={this.props.dataSource} />
                </Box>
            </Container>
        );
    }
}
