import { NavigatorScreenParams } from '@react-navigation/native';
import 'styled-components/native';
import { DefaultTheme } from 'styled-components/native';

export type RootStackParamList = {
  Restaurants: NavigatorScreenParams<RestaurantsNavigatorParams>;
  Checkout: undefined;
  Maps: undefined;
  Settings: undefined;
};

export type RestaurantsNavigatorParams = {
  RestaurantsScreen: undefined;
  RestaurantDetail: { restaurant: RestaurantInfo } | undefined;
};

export type SettingsNavigatorParams = {
  SettingsScreen: undefined;
  FavoritesScreen: undefined;
  CameraScreen: undefined;
};

export type LoginNavigatorParams = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
};

export type CheckoutNavigatorParams = {
  CheckoutScreen: undefined;
  CheckoutErrorScreen: { error: string } | undefined;
  CheckoutSuccessScreen: undefined;
};

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      brand: {
        primary: string;
        secondary: string;
        muted: string;
      };
      ui: {
        primary: string;
        secondary: string;
        tertiary: string;
        quaternary: string;
        disabled: string;
        error: string;
        success: string;
      };
      bg: {
        primary: string;
        secondary: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
        inverse: string;
        error: string;
        success: string;
      };
    };
    fonts: {
      body: string;
      heading: string;
      monospace: string;
      bold: string;
    };
    fontWeights: {
      regular: number;
      medium: number;
      bold: number;
    };
    fontSizes: {
      caption: string;
      button: string;
      body: string;
      title: string;
      h5: string;
      h4: string;
      h3: string;
      h2: string;
      h1: string;
    };
    sizes: string[];
    lineHeights: {
      title: string;
      copy: string;
    };
    space: string[];
  }
}

export type RestaurantInfo = {
  name: string;
  icon: any;
  photos: [string];
  address: string;
  isOpenNow: boolean;
  rating: number;
  isClosedTemporarily: boolean;
  placeId: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};

export type VariantsType = {
  body: (theme: DefaultTheme) => string;
  label: (theme: DefaultTheme) => string;
  hint: (theme: DefaultTheme) => string;
  error: (theme: DefaultTheme) => string;
  caption: (theme: DefaultTheme) => string;
};

type Place = {
  business_status?: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  icon: string;
  name: string;
  opening_hours?: {
    open_now: boolean;
  };
  photos: Photo[];
  place_id: string;
  plus_code?: {
    compound_code?: string;
    global_code?: string;
  };
  price_level?: number;
  rating?: number;
  reference: string;
  scope?: string;
  types?: string[];
  user_ratings_total?: number;
  vicinity: string;
};
export type Photo = {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
};

export type PlacesResponse = {
  html_attributions: string[];
  next_page_token: string;
  results: Place[];
};

export type MockRestaurantFlatListData = {
  name: string;
};

export type LatLng = {
  lat: number;
  lng: number;
  viewport?: Viewport;
};

type Viewport = {
  northeast: LatLng;
  southwest: LatLng;
};

type Geometry = {
  location: LatLng;
  viewport: Viewport;
};

type Result = {
  geometry: Geometry;
};

export type LocationData = {
  results: Result[];
  status?: string;
};

export type Locations = {
  [city: string]: LocationData;
};

export type cartItem = {
  item: string;
  price: number;
  restaurantName: string;
  placeId: string;
  orderDate: string;
  orderTime: string;
  restaurant: RestaurantInfo;
};
