import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { User } from 'firebase/auth';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, List } from 'react-native-paper';
import styled from 'styled-components/native';
import { StyledSafeAreaView } from '../../../components/StyledComponents';
import { Text } from '../../../components/TextComponent';
import { useAuthenticationContext } from '../../../services/authentication/authentication.context';
import { theme } from '../../../theme';
import { SettingsNavigatorParams } from '../../../utils/types';
type SettingsScreenProps = {
  navigation: StackNavigationProp<SettingsNavigatorParams, 'SettingsScreen'>;
};
const StyledAvatarIcon = styled(Avatar.Icon)`
  background-color: ${(props) => props.theme.colors.brand.secondary};
`;

const StyledAvatarUserInfoContainer = styled.View`
  align-items: center;
  margin-vertical: 20px;
  gap: 10px;
`;

const StyledListItem = styled(List.Item).attrs({
  contentStyle: { width: 50, height: 50 },
  titleStyle: { fontSize: 20 },
  descriptionStyle: { fontSize: 15 },
})`
  padding: 15px;
`;

const SettingsScreen: FC<SettingsScreenProps> = ({ navigation }) => {
  const { logOut } = useAuthenticationContext();
  const { authUser } = useAuthenticationContext();
  const [photo, setPhoto] = useState('');
  const getUserProfileImage = async (currentUser: User) => {
    try {
      const imageUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
      if (imageUri) {
        setPhoto(imageUri);
      }
    } catch (e) {
      console.log('Error getting user profile image', e);
    }
  };
  useEffect(() => {
    if (authUser) {
      getUserProfileImage(authUser);
    }
  }, [authUser]);
  useFocusEffect(
    useCallback(() => {
      if (authUser) {
        getUserProfileImage(authUser);
      }
    }, []),
  );
  return (
    <StyledSafeAreaView>
      <StyledAvatarUserInfoContainer>
        <TouchableOpacity onPress={() => navigation.navigate('CameraScreen')}>
          {photo ? (
            <Avatar.Image size={150} source={{ uri: photo }} />
          ) : (
            <StyledAvatarIcon
              size={150}
              icon="human"
              color={theme.colors.bg.primary}
            />
          )}
        </TouchableOpacity>
        <Text variant="body">{authUser ? authUser.email : ''}</Text>
      </StyledAvatarUserInfoContainer>
      <List.Section style={{ flex: 1 }}>
        <StyledListItem
          title="Favorites"
          left={() => (
            <List.Icon color={theme.colors.brand.secondary} icon="heart" />
          )}
          description="View your favorites"
          onPress={() => navigation.navigate('FavoritesScreen')}
        />
        <StyledListItem
          title="Logout"
          left={() => (
            <List.Icon color={theme.colors.brand.secondary} icon="logout" />
          )}
          onPress={logOut}
        />
      </List.Section>
    </StyledSafeAreaView>
  );
};

export default SettingsScreen;
