import { Theme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  badge: {
    backgroundColor: grey[300],
    margin: theme.spacing(0.2),
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.spacing(30),
    fontSize: 12,
    float: "left",
  },
  container: {
    marginTop: theme.spacing(8),
    width: "300px",
  },
}));

function BadgeItem() {
  const classes = useStyles();
  let badgeArray = [
    "명예부산시민",
    "강알리든킨드나스",
    "포동포동남포동",
    "마느그서장남천동",
    "감천문화마을",
    "밀면왕",
    "국밥왕",
    "씨앗호떡",
  ];
  return (
    <div className={classes.container}>
      {badgeArray.map((badge, index) => (
        <span key={index} className={classes.badge}>
          {badge}
        </span>
      ))}
    </div>
  );
}
export default BadgeItem;
