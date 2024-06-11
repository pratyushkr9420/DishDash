import React, { FC } from 'react';
import { Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import open from '../../../../assets/open';
import FadeInView from '../../../components/FadeInView';
import FavoriteButton from '../../../components/FavoriteButton';
import { Text } from '../../../components/TextComponent';
import { RestaurantInfo } from '../../../utils/types';
import {
  StyledCard,
  StyledCardContent,
  StyledCardCover,
  StyledRestaurantDetailsView,
  StyledRestaurantStatusIconsView,
} from './RestaurantInfoCard.styles';
import RestaurantRating from './RestaurantsRating';

type RestaurantInfoCardProps = {
  restaurant: RestaurantInfo;
};
const RestaurantInfoCard: FC<RestaurantInfoCardProps> = ({ restaurant }) => {
  const {
    name,
    photos,
    address,
    icon,
    rating,
    isOpenNow,
    isClosedTemporarily,
  } = restaurant;
  return (
    <FadeInView duration={1000}>
      <StyledCard elevation={5}>
        <FavoriteButton restaurant={restaurant} />
        <StyledCardCover source={{ uri: photos[0] }} />
        <StyledCardContent>
          <Text variant="label">{name}</Text>
          <StyledRestaurantDetailsView>
            <RestaurantRating rating={rating} />
            {isClosedTemporarily && (
              <Text variant="error">Temporarily closed</Text>
            )}
            <StyledRestaurantStatusIconsView>
              {isOpenNow && <SvgXml width={25} height={25} xml={open} />}
              <Image source={{ uri: icon }} width={25} height={25} />
            </StyledRestaurantStatusIconsView>
          </StyledRestaurantDetailsView>
          <Text variant="caption">{address}</Text>
        </StyledCardContent>
      </StyledCard>
    </FadeInView>
  );
};

export default RestaurantInfoCard;
