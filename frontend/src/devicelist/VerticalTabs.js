import React from 'react';
import {
    Tab,
    Tabs
} from "@material-ui/core"

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function verticalTabs(classes, state) {
    const [value, setValue] = state;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs"
                className={classes.tabs}
                class="lightGrey blackFont flexContents"
                orientation="vertical"
                variant="scrollable"
            >
                <Tab label="Senders" {...a11yProps(0)} />
                <Tab label="Receivers" {...a11yProps(1)} />
            </Tabs>
        </React.Fragment>
    );
};
