import {Client} from '@googlemaps/google-maps-services-js';
import {Response} from 'express';
import {Request} from 'firebase-functions/v2/https';
import {mocks} from './mock';

const addGooglePlaceImage = (restaurant: any, key: string) => {
  const ref = restaurant.photos[0].photo_reference;
  let newRestaurant: any = {};
  if (!ref) {
    newRestaurant = {
      ...restaurant,
      photos: [
        'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
      ],
    };
    return newRestaurant;
  } else {
    newRestaurant = {
      ...restaurant,
      photos: [
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${key}`,
      ],
    };
    return newRestaurant;
  }
};

export const placesRequest = (
  request: Request,
  response: Response,
  client: Client,
  key: string,
) => {
  const {location, mock} = request.query;
  if (location) {
    if (mock === 'True') {
      const mockData = mocks[location.toString()];
      response.json(mockData);
    }
    client
      .placesNearby({
        params: {
          key,
          radius: 1500,
          type: 'restaurant',
          location: location.toString(),
        },
        timeout: 1000,
      })
      .then((res) => {
        res.data.results = res.data.results.map((restaurant) =>
          addGooglePlaceImage(restaurant, key),
        );
        return response.json(res.data);
      })
      .catch((e) => response.status(400).send(e.response.data.error_message));
  } else {
    response.json('Not a valid location');
  }
};

// `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${key}`
