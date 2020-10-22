import React from 'react';
import {
    Tab,
    Tabs
} from "@material-ui/core"

export default class VerticalTabs extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event, newValue) {
        this.props.setValue(newValue);
    };

    getTabProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    render() {
        return (
            <React.Fragment>
                <Tabs
                    value={this.props.value}
                    onChange={this.handleChange}
                    aria-label="Vertical tabs"
                    className={this.props.classes.tabs}
                    class="lightGrey blackFont flexContents"
                    orientation="vertical"
                    variant="scrollable"
                >
                    <Tab label="Senders" {...this.getTabProps(0)} />
                    <Tab label="Receivers" {...this.getTabProps(1)} />
                </Tabs>
            </React.Fragment>
        );
    }
};
