import { StackNavigationProp } from '@react-navigation/stack';
import {
  CardField,
  CardFieldInput,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';
import React, { FC, useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import {
  StyledCenteredView,
  StyledSafeAreaView,
} from '../../../components/StyledComponents';
import { useCartContext } from '../../../services/cart/cart.context';
import { isProduction } from '../../../utils';
import { CheckoutNavigatorParams } from '../../../utils/types';
import {
  PaymentProcessing,
  StyledCartIcon,
  StyledCheckoutButton,
  StyledCheckoutInput,
  StyledClearCartButton,
  StyledEmptyCartText,
  StyledTotalText,
} from './CheckoutScreen.styles';
import CartItemComponent from './components/CartItemComponent';

type CheckoutScreenProps = {
  navigation: StackNavigationProp<CheckoutNavigatorParams, 'CheckoutScreen'>;
};

const CheckoutScreen: FC<CheckoutScreenProps> = ({ navigation }) => {
  const [card, setCard] = useState<CardFieldInput.Details | null>(null);
  const [loading, setLoading] = useState(false);
  const [billingName, setBillingName] = useState('');
  const [total, setTotal] = useState(0.0);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { cart, clearCart, calculateCartTotal } = useCartContext();
  const buy = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pay-ix5bbsrqta-uc.a.run.app${isProduction ? '' : 'test'}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            total,
          }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        return Alert.alert(data.message);
      }
      const initSheet = await initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: 'DishDash',
      });
      if (initSheet.error) {
        // console.error(initSheet.error);
        setLoading(false);
        return Alert.alert(initSheet.error.message);
      }
      const presentSheet = await presentPaymentSheet();
      if (presentSheet.error) {
        // console.error(presentSheet.error);
        setLoading(false);
        return Alert.alert(presentSheet.error.message);
      }
      navigation.navigate('CheckoutSuccessScreen');
      setLoading(false);
      setTotal(0.0);
      clearCart();
    } catch (err) {
      // console.error(err);
      setLoading(false);
      navigation.navigate('CheckoutErrorScreen', {
        error: 'Error processing payment',
      });
    }
  };

  useEffect(() => {
    const updateTotal = () => {
      setTotal(calculateCartTotal(cart));
    };
    updateTotal();
  }, [cart]);
  if (cart.length === 0) {
    return (
      <StyledCenteredView>
        <StyledCartIcon icon="cart-off" />
        <StyledEmptyCartText variant="label">
          Your cart is empty
        </StyledEmptyCartText>
      </StyledCenteredView>
    );
  }
  return (
    <StripeProvider publishableKey="pk_test_51PRzZFLuX9n8PDWsGf6aKf6Q7LRSiENQbAI0eQor1zYPUt6bXa9WwXJZe5LVN3XAAPRwdfWoRLSy8COyWbSIPOUn00OyWXNhhj">
      <StyledSafeAreaView>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
          {cart.map((cartItem, idx) => (
            <CartItemComponent cartItem={cartItem} key={idx} />
          ))}
        </ScrollView>
        {loading && <PaymentProcessing />}
        {!loading && (
          <>
            <StyledTotalText variant="label">
              Total:${total / 100}
            </StyledTotalText>
            <StyledCheckoutInput
              onChangeText={(text) => setBillingName(text)}
            />
            {billingName && (
              <CardField
                postalCodeEnabled={false}
                cardStyle={{
                  backgroundColor: '#FFFFFF',
                  textColor: '#000000',
                }}
                style={{
                  width: '100%',
                  height: 100,
                  marginVertical: 5,
                }}
                onCardChange={(cardDetails) => {
                  setCard(cardDetails);
                }}
                // onFocus={(focusedField) => {
                //   console.log('focusField', focusedField);
                // }}
              />
            )}
          </>
        )}
        <StyledCheckoutButton disabled={loading} onPress={buy}>
          Checkout
        </StyledCheckoutButton>
        <StyledClearCartButton disabled={loading} onPress={() => clearCart()}>
          Clear Cart
        </StyledClearCartButton>
      </StyledSafeAreaView>
    </StripeProvider>
  );
};

export default CheckoutScreen;
