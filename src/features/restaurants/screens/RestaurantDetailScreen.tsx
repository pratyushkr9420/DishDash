import { RouteProp } from '@react-navigation/native';
import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { List } from 'react-native-paper';
import { RestaurantsNavigatorParams } from '../../../utils/types';
import RestaurantInfoCard from '../components/RestaurantInfoCard';

type RestaurantDetailScreenProps = {
  route: RouteProp<RestaurantsNavigatorParams, 'RestaurantDetail'>;
};

const RestaurantDetailScreen: FC<RestaurantDetailScreenProps> = ({ route }) => {
  const restaurant = route.params!.restaurant;
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView>
        <List.AccordionGroup>
          <List.Accordion
            title="Breakfast"
            id="1"
            left={(props) => <List.Icon {...props} icon="bread-slice" />}
          >
            <List.Item title="Scrambled Eggs, Bacon and Toast" />
            <List.Item title="Chilaquiles" />
            <List.Item title="Acai Bowl" />
          </List.Accordion>
          <List.Accordion
            title="Lunch"
            id="2"
            left={(props) => <List.Icon {...props} icon="food" />}
          >
            <List.Item title="Burger w/ Fries" />
            <List.Item title="Steak Sandwich" />
            <List.Item title="Pad Thai" />
            <List.Item title="Chicken/Beef Burritos" />
          </List.Accordion>
          <List.Accordion
            title="Dinner"
            id="3"
            left={(props) => <List.Icon {...props} icon="food-variant" />}
          >
            <List.Item title="Spaghetti Bolognese" />
            <List.Item title="Sushi" />
            <List.Item title="Dim Sum" />
            <List.Item title="Tandoori Chicken" />
          </List.Accordion>
          <List.Accordion
            title="Drinks"
            id="4"
            left={(props) => <List.Icon {...props} icon="glass-wine" />}
          >
            <List.Item title="Coffee" />
            <List.Item title="Tea" />
            <List.Item title="Modelo" />
            <List.Item title="Coke" />
            <List.Item title="Fanta" />
            <List.Item title="Red/White Wine" />
          </List.Accordion>
        </List.AccordionGroup>
      </ScrollView>
    </View>
  );
};

export default RestaurantDetailScreen;
