import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import { User } from 'firebase/auth';
import React, { FC, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StyledSafeAreaView } from '../../../components/StyledComponents';
import { useAuthenticationContext } from '../../../services/authentication/authentication.context';
import { SettingsNavigatorParams } from '../../../utils/types';

type SettingsScreenProps = {
  navigation: StackNavigationProp<SettingsNavigatorParams, 'SettingsScreen'>;
};

const CameraScreen: FC<SettingsScreenProps> = ({ navigation }) => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const { authUser } = useAuthenticationContext();
  const setUserProfileImage = async (currentUser: User, image: string) => {
    try {
      await AsyncStorage.setItem(`${currentUser.uid}-photo`, image);
    } catch (e) {
      console.log(e);
    }
  };
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const captureImage = async (): Promise<void> => {
    if (cameraRef.current) {
      let photo: CameraCapturedPicture =
        await cameraRef.current.takePictureAsync();
      if (authUser) {
        await setUserProfileImage(authUser, photo.uri);
      }
      navigation.navigate('SettingsScreen');
    }
  };

  return (
    <StyledSafeAreaView>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={captureImage}>
            <Text style={styles.text}>Capture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </StyledSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CameraScreen;
