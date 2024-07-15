import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { isProduction } from '../../utils';
import { RestaurantInfo } from '../../utils/types';
import { useLocationContext } from '../location/location.context';
import { mockImages } from './mock';
import {
  fetchRestaurants,
  restaurantsDataTransform,
} from './restaurant.service';

type RestaurantsContextType = {
  restaurants: RestaurantInfo[];
  isLoading: boolean;
  restaurantError: Error | null;
};

const RestaurantsContext = createContext<RestaurantsContextType | undefined>(
  undefined,
);

function useRestaurantsContext() {
  const context = useContext(RestaurantsContext);
  if (context === undefined) {
    throw new Error(
      'useRestaurantsContext must be used within a RestaurantsProvider',
    );
  }
  return context;
}

function RestaurantsProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const { location } = useLocationContext();
  const retriveRestaurants = () => {
    const formattedLocation = location
      ? `${location.lat},${location.lng}`
      : '41.878113,-87.629799';
    setIsLoading(true);
    setRestaurants([]);
    try {
      fetchRestaurants(formattedLocation).then((data) => {
        const results: any = restaurantsDataTransform(data);
        const restaurants: RestaurantInfo[] = results.map((result: any) => {
          return {
            name: result.name,
            icon: result.icon,
            photos: !isProduction
              ? result.photos.map((photo: any) => {
                  return mockImages[
                    Math.floor(Math.random() * mockImages.length)
                  ];
                })
              : result.photos,
            address: result.vicinity,
            isOpenNow: result.isOpenNow,
            rating: result.rating,
            isClosedTemporarily: result.isClosedTemporarily,
            placeId: result.placeId,
            geometry: {
              location: result.geometry.location,
            },
          };
        });
        setRestaurants(restaurants);
        setError(null);
        setIsLoading(false);
      });
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    retriveRestaurants();
  }, [location]);
  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        restaurantError: error,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
}
export { RestaurantsProvider, useRestaurantsContext };
