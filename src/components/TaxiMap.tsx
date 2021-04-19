import { Component } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { findNearest } from "geolib";
import NavigationIcon from "@material-ui/icons/Navigation";
import { Container, Fab, Grid, withStyles } from "@material-ui/core";
import api from "../api";
import { splytOffices } from "../constants";
import TaxiCountSlider from "./TaxiCountSlider";
import OfficesRadio from "./OfficesRadio";
import { Taxi, TaxiResponse } from "../interfaces";
import { getCurrentPosition, getRegionFromLatLng } from "../helpers";

const containerStyle = {
  width: 750,
  height: 750,
};

const useStyles = () => ({
  root: {
    flexGrow: 1,
    margin: 10,
  },
});

type TaxiMapProps = {
  classes: any;
};

class TaxiMap extends Component<TaxiMapProps> {
  constructor(props: any) {
    super(props);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.updateMapCenter = this.updateMapCenter.bind(this);
    this.configureMapCenter = this.configureMapCenter.bind(this);
  }
  state = {
    center: {
      region: "singapore",
      ...splytOffices.singapore,
    },
    taxis: [],
  };

  fetchTaxis(lat: number, lng: number, count: number = 10) {
    api
      .get(`/taxi?latitude=${lat}&longitude=${lng}&count=${count}`)
      .then((response: TaxiResponse) => {
        this.setState({ taxis: response.drivers });
      });
  }

  configureMapCenter(currentPosition: GeolocationPosition) {
    const coordinates: GeolocationCoordinates = currentPosition.coords;
    const { lat, lng }: any = findNearest(
      coordinates,
      Object.values(splytOffices)
    );
    this.setState({
      center: {
        region: getRegionFromLatLng(lat, lng),
        lat,
        lng,
      },
    });
    this.fetchTaxis(lat, lng);
  }

  componentDidMount() {
    getCurrentPosition(this.configureMapCenter);
  }

  onSliderChange(count: number) {
    const {
      center: { lat, lng },
    } = this.state;

    this.fetchTaxis(lat, lng, count);
  }

  updateMapCenter(value: any) {
    const newCenter = splytOffices[value];
    const { lat, lng } = newCenter;

    this.setState({
      center: {
        region: getRegionFromLatLng(lat, lng),
        ...newCenter,
      },
    });
    this.fetchTaxis(lat, lng);
  }

  renderTaxis(taxi: Taxi) {
    return (
      <Marker
        key={taxi.driver_id}
        position={{ lat: taxi.location.latitude, lng: taxi.location.longitude }}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { center, taxis } = this.state;

    return (
      <Container className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <TaxiCountSlider
              onSliderChange={this.onSliderChange}
            ></TaxiCountSlider>
          </Grid>
          <Grid item xs={2}>
            <OfficesRadio
              currentOffice={center.region}
              updateMapCenter={this.updateMapCenter}
            ></OfficesRadio>
          </Grid>
          <Grid item xs={3}>
            <Fab
              onClick={() => getCurrentPosition(this.configureMapCenter)}
              variant="extended"
            >
              <NavigationIcon />
              Nearest
            </Fab>
          </Grid>
          <Grid item xs={6}>
            <LoadScript googleMapsApiKey="AIzaSyCw9VuV6FWHDygZgZTYpOedeNLXNkDfF7o">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
              >
                {!!taxis.length && taxis.map(this.renderTaxis)}
              </GoogleMap>
            </LoadScript>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(useStyles)(TaxiMap);
