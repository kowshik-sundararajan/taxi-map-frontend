export type Taxi = {
  driver_id: string;
  location: {
    latitude: number;
    longitude: number;
    bearing: number;
  };
};

export type TaxiResponse = {
  pickup_eta: number;
  drivers: Taxi[];
};
