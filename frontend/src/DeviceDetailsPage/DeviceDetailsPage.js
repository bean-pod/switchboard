import { Title } from "@material-ui/icons";
import React from "react";

export default class DeviceDetailsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isData: false,
      device: props.device
    };
  }

  useEffect() {}

  render() {
    return (
      <Container>
        <DynamicBreadcrumb
          breadcrumbs={[
            ["Home", ""],
            ["My Devices", "Devices"],
            ["Device", "Streaming"]
          ]}
        />
        <Box padding="1em">
          <Box className="flexContents headerArea">
            <div className="title">Streaming</div>
          </Box>

          <div id="StreamingTable">
            <StreamingTable device={this.props.device} />
          </div>
        </Box>
      </Container>
    );
  }
}
