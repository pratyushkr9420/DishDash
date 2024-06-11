import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { RestaurantInfo } from '../../utils/types';
import { useAuthenticationContext } from '../authentication/authentication.context';

type favoritesContext = {
  favorites: RestaurantInfo[];
  addToFavorites: (restaurant: RestaurantInfo) => void;
  removeFromFavorites: (restaurantToRemove: RestaurantInfo) => void;
};

const FavoritesContext = createContext<favoritesContext | undefined>(undefined);

function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error(
      'useFavoritesContext must be used within a FavoritesProvider',
    );
  }
  return context;
}

function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [favorites, setFavorites] = useState<RestaurantInfo[]>([]);
  const { authUser } = useAuthenticationContext();
  const addToFavorites = (restaurant: RestaurantInfo) => {
    setFavorites([...favorites, restaurant]);
  };
  const removeFromFavorites = (restaurantToRemove: RestaurantInfo) => {
    const filteredFavorites = favorites.filter(
      (restaurant) => restaurant.placeId !== restaurantToRemove.placeId,
    );
    setFavorites(filteredFavorites);
  };

  const storeFavorites = async (data: RestaurantInfo[], uid: string) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(`@favorites-${uid}`, jsonValue);
    } catch (error) {
      console.log('Error while saving favorites:', error);
    }
  };
  const getFavorites = async (uid: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@favorites-${uid}`);
      const newFavorites = jsonValue != null ? JSON.parse(jsonValue) : [];
      setFavorites(newFavorites);
    } catch (e) {
      console.log('Error while getting favorites:', e);
    }
  };

  useEffect(() => {
    if (authUser && authUser.uid) {
      getFavorites(authUser.uid);
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser && authUser.uid) {
      storeFavorites(favorites, authUser.uid);
    }
  }, [favorites, authUser]);
  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
export { FavoritesProvider, useFavoritesContext };
