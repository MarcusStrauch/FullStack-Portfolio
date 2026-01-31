import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const LinkRouter = (props) => {
  return <Link {...props} component={RouterLink} />;
};
