import { makeStyles } from "@material-ui/core";

export default function defaultMakeStylesTheme() {
    return (
        makeStyles((theme) => ({
            root: {
                backgroundColor: theme.palette.background.paper
            },
            tabs: {
                borderRight: `1px solid ${theme.palette.divider}`,
            },
        }))
    );       
}