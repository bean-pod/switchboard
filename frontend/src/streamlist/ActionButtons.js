import React from 'react'
import {
    IconButton
} from '@material-ui/core'
import {
    Sync,
    Pause,
    Block
} from '@material-ui/icons'

export default function ActionButtons() {

    return (
        <React.Fragment>
            <div align="center">
                <IconButton><Sync /></IconButton>
                <IconButton><Pause /></IconButton>
                <IconButton><Block /></IconButton>
            </div>
        </React.Fragment>
    );
}