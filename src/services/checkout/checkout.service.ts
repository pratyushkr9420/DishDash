import { presentPaymentSheet } from '@stripe/stripe-react-native';
import { Alert } from 'react-native';

export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();
  if (error) {
    Alert.alert(`Error code: ${error.code}`, error.message);
  } else {
    Alert.alert('Success', 'Your order is confirmed!');
  }
};
