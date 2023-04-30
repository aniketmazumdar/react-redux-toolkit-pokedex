import "./index.css";
import Grid from '@mui/material/Grid';


export const Header = () => {
  return (
    <Grid container className="header">
      <Grid item md={2} xs={12} className="header-title">
        Pokédex
      </Grid>
      <Grid item md={10} xs={12} className="header-subtitle">
        Search for any Pokenmon that exists on other planet
      </Grid>
    </Grid>
  );
}