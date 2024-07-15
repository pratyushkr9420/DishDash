import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { LatLng } from '../../utils/types';
import { getLocationRequest, locationTransformData } from './location.service';

type LocationContextType = {
  location: LatLng;
  keyword: string;
  searchLocation: (searchTerm: string) => void;
  locationError: Error | null;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined,
);

function useLocationContext() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error(
      'useLocationContext must be used within a LocationProvider',
    );
  }
  return context;
}

function LocationProvider({ children }: { children: ReactNode }): ReactElement {
  const [location, setLocation] = useState<LatLng>({
    lat: 41.878113,
    lng: -87.629799,
    viewport: {
      northeast: {
        lat: 41.88758823029149,
        lng: -87.6194830697085,
      },
      southwest: {
        lat: 41.88489026970849,
        lng: -87.6221810302915,
      },
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('Chicago');
  const [error, setError] = useState(null);
  const searchLocation = (searchTerm: string = '') => {
    if (searchTerm === '') {
      return;
    }
    setIsLoading(true);
    setKeyword(searchTerm);
    getLocationRequest(searchTerm.toLowerCase())
      .then((data) => {
        const searchLocation = locationTransformData(data);
        setLocation(searchLocation);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    const search = () => searchLocation('');
    search();
  }, []);
  return (
    <LocationContext.Provider
      value={{
        location,
        keyword,
        searchLocation,
        locationError: error,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
export { LocationProvider, useLocationContext };
