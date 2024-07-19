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

type Photo = {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
};

export type Place = {
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

export type PlacesResponse = {
  html_attributions: string[];
  next_page_token: string;
  results: Place[];
};
