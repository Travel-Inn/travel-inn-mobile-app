import React from 'react';
import Toast from 'react-native-toast-message'

import { AuthenticatedUserProvider } from './AuthenticatedUserProvider';
import RootNavigator from './rootNavigation';

/**
 * Wrap all providers here
 */
console.log("Was this executed");

export default function Routes() {
  return (
   <>
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
    <Toast />
    </>

  );
}