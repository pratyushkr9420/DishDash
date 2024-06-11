import React, { FC } from 'react';
import CompactRestaurantInfoCard from '../../../components/CompactRestaurantInfo';
import { RestaurantInfo } from '../../../utils/types';

type MapCalloutProps = {
  restaurant: RestaurantInfo;
};

const MapCallout: FC<MapCalloutProps> = ({ restaurant }) => {
  return <CompactRestaurantInfoCard restaurant={restaurant} />;
};

export default MapCallout;
