import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemText } from "@material-ui/core";

export default class SelectTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  handleListItemClick(index) {
    const { setIndex } = this.props;
    setIndex(index);
  }

  render() {
    const { selectedIndex, items } = this.props;
    return (
      <List>
        {items.map((item, index) => {
          return (
            <ListItem
              button
              key={item}
              selected={selectedIndex === index}
              onClick={() => this.handleListItemClick(index)}
            >
              <ListItemText primary={item} />
            </ListItem>
          );
        })}
      </List>
    );
  }
}

SelectTable.propTypes = {
  selectedIndex: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired
};
