// import { presentPaymentSheet } from '@stripe/stripe-react-native';
// import { ReactElement, ReactNode, createContext, useContext } from 'react';
// import { Alert } from 'react-native';

// type checkoutContextType = {
//   openPaymentSheet: () => void;
// };

// const CheckoutContext = createContext<checkoutContextType | undefined>(
//   undefined,
// );

// function useCheckoutContext() {
//   const context = useContext(CheckoutContext);
//   if (context === undefined) {
//     throw new Error(
//       'usecheckoutContext must be used within a checkoutProvider',
//     );
//   }
//   return context;
// }

// function CheckoutProvider({ children }: { children: ReactNode }): ReactElement {
//   const openPaymentSheet = async () => {
//     const { error } = await presentPaymentSheet();
//     if (error) {
//       Alert.alert(`Error code: ${error.code}`, error.message);
//     } else {
//       Alert.alert('Success', 'Your order is confirmed!');
//     }
//   };
//   return (
//     <CheckoutContext.Provider
//       value={{
//         openPaymentSheet,
//       }}
//     >
//       {children}
//     </CheckoutContext.Provider>
//   );
// }
// export { CheckoutProvider, useCheckoutContext };
