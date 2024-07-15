import camelize from 'camelize-ts';
import { isProduction } from '../../utils';
import { LatLng, LocationData } from '../../utils/types';
import { locations } from './mockLocation';

// Mock getLocationRequest
export const getLocationRequest = (searchTerm = ''): Promise<LocationData> => {
  // Logic for making a mock return of location data
  if (isProduction) {
    return fetch(`https://geocode-ix5bbsrqta-uc.a.run.app?city=${searchTerm}`)
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.log('Error while getting location', error));
  }
  return new Promise((resolve, reject) => {
    const searchedCity = locations[searchTerm];
    if (!searchedCity) {
      reject('Not found data for this location');
    }
    resolve(searchedCity);
  });
};

export const locationTransformData = (result: LocationData): LatLng => {
  const results = camelize(result.results);
  const { geometry } = results[0];
  const { lat, lng } = geometry.location;
  return { lat, lng, viewport: geometry.viewport };
};
