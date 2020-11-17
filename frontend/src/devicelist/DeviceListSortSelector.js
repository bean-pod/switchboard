import React from "react";
import { Select, Typography, MenuItem } from "@material-ui/core";

export default class DeviceListSortSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: ""
    };

    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleSortChange(event) {
    this.setState({
      sort: event.target.value
    });
  }

  render() {
    return (
      <>
        <div flex-grow="1">
          <Typography className="sortBy" variant="caption">
            Sort By
          </Typography>
          <Select
            value={this.state.sort}
            onChange={this.handleSortChange}
            variant="outlined"
            id="sortBySelect"
          >
            <MenuItem dense="true" value="Name">
              {" "}
              <Typography variant="caption">Name</Typography>
            </MenuItem>
            <MenuItem dense="true" value="Last Access">
              {" "}
              <Typography variant="caption">Last Access</Typography>
            </MenuItem>
            <MenuItem dense="true" value="Offline">
              {" "}
              <Typography variant="caption">Offline</Typography>
            </MenuItem>
          </Select>
        </div>
      </>
    );
  }
}
