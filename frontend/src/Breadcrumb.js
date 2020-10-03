import React from 'react';
import {
    Breadcrumbs, 
    Typography
} from "@material-ui/core"
import parse from 'html-react-parser';

function Breadcrumb(){

    var element = "<Breadcrumbs aria-label=\"breadcrumb\">";
    var currentBreadcrumb = "/"

    for (var i=0; i< arguments.length; i++)
    {
        if (i == (arguments.length -1) )
        {
            element.concat("<Typography color=\"textPrimary\">", arguments[i],"</Typography>")
        }
        currentBreadcrumb.concat( "/", arguments[i]);

        element += "<Link color=\"inherit\" href=\"" 
                + currentBreadcrumb + "\" onClick={handleClick}>" 
                + arguments[i] + "</Link>);"
    }

    element.concat("</Breadcrumbs>")
    return parse(element)
}

export default Breadcrumb("home", "device");