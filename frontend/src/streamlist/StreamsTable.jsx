import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import HeadCells from "./HeadCells";
import SingleStreamRow from "./SingleStreamRow";

export default class StreamsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: []
    };
    this.dataSource = props.dataSource;
    this.handleStreamsChange = this.handleStreamsChange.bind(this);
  }

  componentDidMount() {
    this.dataSource.getAllStreams(this.handleStreamsChange);
  }

  handleStreamsChange(streams) {
    this.setState({
      streams
    });
  }

  render() {
    return (
      <>
        <Box>
          <TableContainer style={{ maxHeight: 450 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <HeadCells />
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.streams.map((stream) => {
                  return (
                    <SingleStreamRow key={stream.id} streamDetails={stream} />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  }
}
