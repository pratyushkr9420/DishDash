import {Client} from '@googlemaps/google-maps-services-js';
import {Response} from 'express';
import {Request} from 'firebase-functions/v2/https';
import {locations} from './geocode.mock';
export const geocodeRequest = (
  request: Request,
  response: Response,
  client: Client,
  key: string,
) => {
  const {city, mock} = request.query;
  console.log(request.body);
  if (city) {
    const locationsMockData = locations[city.toString().toLowerCase()];
    if (mock === 'True') {
      return response.json(locationsMockData);
    }
    client
      .geocode({
        params: {
          key,
          address: city.toString().toLowerCase(),
        },
        timeout: 1000,
      })
      .then((res) => {
        return response.json(res.data);
      })
      .catch((e) => response.status(400).send(e.response.data.error_message));
  } else {
    response.json('Not a valid location');
  }
};
