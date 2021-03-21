import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import "./App.css";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import ListRow from "./ListRow";
const countriesURL = "https://restcountries.eu/rest/v2/all";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  countryimage: {
    [theme.breakpoints.down("xs")]: {
      width: "20px",
    },
  },
  country: {
    cursor: "pointer",
  },
  table: {
    // minWidth: 650,
    "& .MuiTableCell-root": {
      [theme.breakpoints.down("xs")]: {
        padding: "10px",
      },
    },
    "& .MuiTableRow-root:hover": {
      background: "whitesmoke",
    },
    [theme.breakpoints.down("xs")]: {
      "& td": {
        fontSize: 8,
      },
      "& th": {
        fontSize: 8,
      },
    },
  },
}));

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState({});

  const toggleDrawer = (open, country) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
    setSelectedCountry(country);
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <img
        src={selectedCountry?.flag}
        alt={`${selectedCountry?.flag}`}
        width={50}
        style={{ paddingLeft: 10, marginTop: 20, marginBottom: 20 }}
      />
      <ListRow title="Name" value={selectedCountry?.name} />
      <ListRow title="Native Name" value={selectedCountry?.nativeName} />
      <ListRow title="Capital" value={selectedCountry?.capital} />
      <ListRow title="Alpha 3 code" value={selectedCountry?.alpha3Code} />
      <ListRow title="Numeric Code" value={selectedCountry?.numericCode} />
      <ListRow title="Population" value={selectedCountry?.population} />
      <ListRow title="Region" value={selectedCountry?.region} />
      <ListRow title=" Sub Region" value={selectedCountry?.subregion} />
      <ListRow title="Lat Long" value={selectedCountry?.latlng?.join(", ")} />
      <ListRow
        title="Time Zones"
        value={selectedCountry?.timezones?.join(", ")}
      />
      <ListRow
        title="Alt spellings"
        value={selectedCountry?.altSpellings?.join(", ")}
      />
    </div>
  );

  const getCountriesWithAxios = async () => {
    const response = await axios.get(countriesURL);
    setCountriesData(response.data);
    setCountriesData(response.data);
    console.log(response.data[0]);
  };

  useEffect(() => {
    getCountriesWithAxios();
  }, []);
  return (
    <>
      <Drawer anchor={"right"} open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>

      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Flag</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Capital</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Population</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Region</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countriesData.map((country) => (
                  <TableRow key={country.numericCode}>
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={toggleDrawer(true, country)}
                      className={classes.country}
                    >
                      {country.name}
                    </TableCell>
                    <TableCell align="right">
                      <img
                        src={country.flag}
                        alt=""
                        width="32px"
                        className={classes.countryimage}
                      />
                    </TableCell>
                    <TableCell align="right">{country.capital}</TableCell>
                    <TableCell align="right">{country.population}</TableCell>
                    <TableCell align="right">{country.region}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
    // <Sidebar />
  );
}

export default App;
