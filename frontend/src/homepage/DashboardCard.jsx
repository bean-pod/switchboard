import React from "react";
import ReactDOM from "react-dom";
import "./homepage.css";
import {
  Paper,
} from "@material-ui/core";

export default function DashCard(props){
    return (
        <Paper className="dashboardCard">{props.children}</Paper>
    );
}