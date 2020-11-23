import { makeStyles } from '@material-ui/core'
import DefaultMakeStylesTheme from '../DefaultMakeStylesTheme'

let expectedTheme = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}))

test('useStyles returns expected default theme', () => {
    var usedStyles = DefaultMakeStylesTheme();
    expect(usedStyles.toString()).toBe(expectedTheme.toString());
})