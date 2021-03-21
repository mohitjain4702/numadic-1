import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GrainIcon from "@material-ui/icons/Grain";

const useStyles = makeStyles((theme) => ({
  listrow: {
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
    borderBottom: "1px solid whitesmoke",
    fontSize: 12,
    "& h2": {
      marginLeft: 5,
      fontSize: 12,
    },
  },
}));
const ListRow = ({ title, value }) => {
  const styles = useStyles();
  return (
    <div className={styles.listrow}>
      <GrainIcon fontSize="small" color="primary" />
      {title}:<h2>{value}</h2>
    </div>
  );
};

export default ListRow;
