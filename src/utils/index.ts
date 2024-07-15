import { RestaurantInfo } from './types';

export const isProduction = false;

export const mockRestaurant: RestaurantInfo = {
  name: 'My Restaurant',
  icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
  photos: [
    'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
  ],
  address: '100 Random Stree',
  isOpenNow: true,
  rating: 4.5,
  isClosedTemporarily: true,
  geometry: {
    location: {
      lat: 51.2132707,
      lng: 4.4168305,
    },
  },
  placeId: 'some place id 1',
};
