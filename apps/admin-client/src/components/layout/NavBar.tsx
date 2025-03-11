import { List, ListItem, ListItemText } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { headers } from "next/headers";
import {Link} from "../Common/Link";

export const NavBar = () => {
  
  const navbarMenuItems = [
    {
      text: "Sessions",
      path: "/sessions",
      icon:  <FormatListBulletedIcon />,
    },
    {
      text: "Exercises",
      path: "/exercises",
      icon:  <FormatListBulletedIcon />,
    }
  ]
  return (
    <List>
      {navbarMenuItems.map(({text, path, icon}) => (
        <ListItem
          sx={{
            gap: 1,
          }}
          key={text}
        >
          {icon} <Link href={path}><ListItemText primary={text} /> </Link>
        </ListItem>
      ))}
    </List>
  );
};
