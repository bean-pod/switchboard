import React from 'react';
import {
    TableCell,
    TableSortLabel,
    Select,
    Typography,
    TextField,
    MenuItem
} from "@material-ui/core"
import HeadCell from '../model/HeadCell'

export default class HeadCells extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status:""
        }
        this.headcells = this.getHeadCellData();

        this.handleStatusChange=this.handleStatusChange.bind(this);
    }

    getHeadCellData() {
        return [
            new HeadCell("name", "Name", false, false),
            new HeadCell("serial", "Serial Number", true, true),
            new HeadCell("status", "Status", false, true),
            new HeadCell("ip", "IP Address", true, true),
            new HeadCell("port", "Port", true, true)
        ];
    }

    handleStatusChange(event){
        this.setState({
          status: event.target.value
        });
      }

    render() {
        return (
            <React.Fragment>
                {this.headcells.map((headCell) => (
                    <TableCell
                        class="tableHeadCell lightestGrey"
                        key={headCell.id}
                        padding={headCell.padding ? 'default' : 'none'}
                    >
                        <TableSortLabel>
                            <Typography component={'span'} variant="caption"> {headCell.label}</Typography>
                        </TableSortLabel>
                        {headCell.id === "status" ? (
                            <Select 
                                value={this.state.status} 
                                variant="outlined"
                                onChange={this.handleStatusChange}
                                id={headCell.searchID} 
                                fullWidth={true} >
                                    <MenuItem dense="true" value={"Online"}> <Typography variant="caption">Online</Typography></MenuItem>
                                    <MenuItem dense="true" value={"Pending"}> <Typography variant="caption">Pending</Typography></MenuItem>
                                    <MenuItem dense="true" value={"Error"}>   <Typography variant="caption">Error</Typography></MenuItem>
                                    <MenuItem dense="true" value={"Offline"}> <Typography variant="caption">Offline</Typography></MenuItem>
                            </Select>
                        ) :
                            (
                                <TextField variant="outlined" id={headCell.searchID} size="small" />
                            )}
                    </TableCell>
                ))}
            </React.Fragment>

        );
    }
}
