import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import HomeStack from "./userStack";
import AuthStack from './authStack';
import Firebase from '../config/firebase'; 
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';

// Listener for user auth changes. 

//const auth = firebase.auth();
const auth = Firebase.auth();


export default function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
      try {
        await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    });

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  if (Loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    // If user is logged in, direct user to home stack, else authentication stack.
    <NavigationContainer>
      {user ? <HomeStack/> : <AuthStack/> }
    </NavigationContainer>
  );
}