import React, { FC, useEffect, useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
//import { StyledSafeAreaView } from '../../../components/StyledComponents';
import { StackNavigationProp } from '@react-navigation/stack';
import { View } from 'react-native';
import { StyledCenteredView } from '../../../components/StyledComponents';
import { Text } from '../../../components/TextComponent';
import { useLocationContext } from '../../../services/location/location.context';
import { useRestaurantsContext } from '../../../services/restaurants/restaurant.context';
import { RestaurantsNavigatorParams } from '../../../utils/types';
import MapCallout from '../components/MapCallout';
import MapSearch from '../components/MapSearch';

type MapScreenProps = {
  navigation: StackNavigationProp<
    RestaurantsNavigatorParams,
    'RestaurantDetail'
  >;
};
const MapScreen: FC<MapScreenProps> = ({ navigation }) => {
  const { location, locationError } = useLocationContext();
  const [latitudeDelta, setlatitudeDelta] = useState(0.0);
  const { restaurants } = useRestaurantsContext();
  const calculateDelta = () => {
    if (location && location.viewport) {
      const northeastlat = location.viewport.northeast.lat;
      const southwestlat = location.viewport.southwest.lat;
      setlatitudeDelta(northeastlat - southwestlat);
    }
  };
  useEffect(() => {
    calculateDelta();
  }, [location]);
  return (
    <View style={{ flex: 1 }}>
      <MapSearch />
      {!!!locationError ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            longitude: -87.629799,
            latitude: 41.878113,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          region={{
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta,
            longitudeDelta: 0.02,
          }}
        >
          {restaurants.map((restaurant) => (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() =>
                  navigation.navigate('RestaurantDetail', { restaurant })
                }
              >
                <MapCallout restaurant={restaurant} />
              </Callout>
            </Marker>
          ))}
        </MapView>
      ) : (
        <StyledCenteredView>
          <Text variant="error">Invalid location..</Text>
        </StyledCenteredView>
      )}
    </View>
  );
};

export default MapScreen;
