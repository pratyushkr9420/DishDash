import camelize from 'camelize-ts';
import { isProduction } from '../../utils';
import { PlacesResponse } from '../../utils/types';
import { mocks } from './mock';

export const fetchRestaurants = (location: string): Promise<PlacesResponse> => {
  if (isProduction) {
    return fetch(
      `https://placesnearby-ix5bbsrqta-uc.a.run.app?location=${location}`,
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.log('Error while fetching restaurants', error));
  }
  // Logic for making a mock return of restaurant data
  return new Promise((resolve, reject) => {
    const mockData = mocks[location];
    if (!mockData) {
      reject('Not found data for this location');
    }
    resolve(mockData);
  });
};

export const restaurantsDataTransform = (result: PlacesResponse) => {
  const { results } = result;
  const modifiedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      isOpenNow: restaurant.opening_hours?.open_now,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
    };
  });
  return camelize(modifiedResults);
};
