import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./app/AppRouter";

ReactDOM.render(<AppRouter />, document.getElementById("root"));
// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <HeaderBar />
//       <Switch>
//         <Route exact path={["/", "/Home"]} component={HomePage} />
//         <Route
//           exact
//           path="/Devices"
//           render={() => <DeviceListPage dataSource={DeviceApi} />}
//         />
//         <Route
//           exact
//           path="/Streaming"
//           render={() => (
//             <StreamingTablePage
//               deviceDataSource={DeviceApi}
//               streamDataSource={StreamApi}
//             />
//           )}
//         />
//         <Route
//           exact
//           path="/Devices/Details/:deviceId"
//           component={DeviceDetailsPage}
//         />
//         <Route
//           exact
//           path="/Logs"
//           render={() => <LogListPage logsDataSource={LogApi} />}
//         />
//         <Route exact path="/Login" component={LoginPage} />
//       </Switch>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
