import React from 'react';
import {
    TableCell,
    TableSortLabel,
    Select,
    Typography,
    TextField,
    MenuItem
} from "@material-ui/core"

class HeadCell{
    constructor(id, label, isNum, padding,){
        this.id = id;
        this.label = label;
        this.isNumeric = isNum;
        this.searchID = id +"Search";
        this.padding = padding;
    }
}
function getHeadCellData(){
    
    return [
         new HeadCell("name", "Name", false, false),
          new HeadCell("serial", "Serial Number", true, true),
          new HeadCell("status", "Status", false, true),
          new HeadCell("ip", "IP Address", true, true),
          new HeadCell("port", "Port", true, true)
     ] ;

  };

export default function generateHeadCells(){
    var headcells = getHeadCellData();

    var html = headcells.map((headCell)=> (
                <TableCell
                 key= {headCell.id}
                 padding={headCell.padding ?  'default': 'none'}
                 >
                     <TableSortLabel>
                        <Typography component={'span'} variant="caption"> {headCell.label}</Typography>
                     </TableSortLabel>
                    {headCell.id === "status"? (
                        <Select variant="outlined" id={headCell.searchID} fullWidth={true} >
                        <MenuItem dense="true" value={"Online"}> <Typography variant="caption">Online</Typography></MenuItem>
                        <MenuItem dense="true" value={"Pending"}> <Typography variant="caption">Pending</Typography></MenuItem>
                        <MenuItem dense="true" value={"Error"}>   <Typography variant="caption">Error</Typography></MenuItem>
                        <MenuItem dense="true" value={"Offline"}> <Typography variant="caption">Offline</Typography></MenuItem>
                    </Select>
                    ):
                    (
                        <TextField variant="outlined" id={headCell.searchID} size="small" />
                    )}
                </TableCell>
            ));

    return html;
}


