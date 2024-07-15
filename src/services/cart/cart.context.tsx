// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { RestaurantInfo, cartItem } from '../../utils/types';
import { useAuthenticationContext } from '../authentication/authentication.context';

type cartContext = {
  cart: cartItem[];
  addToCart: (
    item: { name: string; price: number },
    targetRestaurant: RestaurantInfo,
  ) => void;
  clearCart: () => void;
  calculateCartTotal: (currentCart: cartItem[]) => number;
};

const CartContext = createContext<cartContext | undefined>(undefined);

function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error(
      'useFavoritesContext must be used within a FavoritesProvider',
    );
  }
  return context;
}

function CartProvider({ children }: { children: ReactNode }): ReactElement {
  const [cart, setCart] = useState<cartItem[]>([]);
  const { authUser } = useAuthenticationContext();

  const storeCart = async (data: cartItem[], uid: string) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
    } catch (error) {
      console.log('Error while saving favorites:', error);
    }
  };
  const getCart = async (uid: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@cart-${uid}`);
      const newCart = jsonValue != null ? JSON.parse(jsonValue) : [];
      setCart(newCart);
    } catch (e) {
      console.log('Error while getting favorites:', e);
    }
  };

  const addToCart = (
    item: { name: string; price: number },
    targetRestaurant: RestaurantInfo,
  ) => {
    if (targetRestaurant.name && targetRestaurant.placeId) {
      const currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      let currentTime =
        currentDate.getHours() +
        ':' +
        currentDate.getMinutes() +
        ':' +
        currentDate.getSeconds();
      setCart([
        ...cart,
        {
          item: item.name,
          price: item.price,
          restaurantName: targetRestaurant.name,
          placeId: targetRestaurant.placeId,
          orderDate: `${day}-${month}-${year}`,
          orderTime: currentTime,
          restaurant: targetRestaurant,
        },
      ]);
    }
  };
  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    if (authUser && authUser.uid) {
      getCart(authUser.uid);
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser && authUser.uid) {
      storeCart(cart, authUser.uid);
    }
  }, [cart, authUser]);
  const calculateCartTotal = (currentCart: cartItem[]) => {
    let cartTotal = 0.0;
    currentCart.forEach((cartItem) => {
      cartTotal += cartItem.price;
    });
    return cartTotal;
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        calculateCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export { CartProvider, useCartContext };
