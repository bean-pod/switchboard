import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HeaderBar from './HeaderAppBar';
import DeviceList from './devicelist/DeviceList';
import StreamingTable from './createStream/StreamingPage';


import { 
  BrowserRouter,
  Route,
  Switch
 } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HeaderBar />
      <Switch>
        <Route exact path="/Devices" component={DeviceList}/>
        <Route exact path="/Streaming" component={StreamingTable}/>
      </Switch>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);
