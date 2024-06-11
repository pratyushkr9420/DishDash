import camelize from 'camelize-ts';
import { LatLng, LocationData } from '../../utils/types';
import { locations } from './mockLocation';

export const getLocationRequest = (searchTerm = ''): Promise<LocationData> => {
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
