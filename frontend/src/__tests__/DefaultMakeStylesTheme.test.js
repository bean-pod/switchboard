import { makeStyles } from "@material-ui/core";
import DefaultMakeStylesTheme from "../DefaultMakeStylesTheme";

const expectedTheme = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

test("useStyles returns expected default theme", () => {
  const usedStyles = DefaultMakeStylesTheme();
  expect(usedStyles.toString()).toBe(expectedTheme.toString());
});
