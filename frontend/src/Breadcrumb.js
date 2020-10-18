import React from 'react';
import {
    Breadcrumbs,
    Typography
} from "@material-ui/core"
import parse from 'html-react-parser';

function Breadcrumb() {

    var element = "<Breadcrumbs aria-label=\"breadcrumb\">";
    var currentBreadcrumb = "/"

    for (var i = 0; i < arguments.length; i++) {
        if (i == (arguments.length - 1)) {
            element.concat("<Typography color=\"textPrimary\">", arguments[i], "</Typography>")
        }
        currentBreadcrumb.concat("/", arguments[i]);

        element += "<Link color=\"inherit\" href=\""
            + currentBreadcrumb + "\" onClick={handleClick}>"
            + arguments[i] + "</Link>);"
    }

    element.concat("</Breadcrumbs>")
    return parse(element)
}

class Breadcrumb extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Breadcrumbs aria-label="breadcrumb">
                {this.props.breadcrumbs.map((crumb) => {
                    return (
                        <React.Fragment>
                            <Typography color="textPrimary"> {crumb}"</Typography>
                    <Link color="inherit" href={"\ " + crumb} onClick={handleClick}> {crumb}</Link>
                        </React.Fragment>
                    
                    );
                })}
            </Breadcrumbs>
        );
    }
}
export default Breadcrumb("home", "device");