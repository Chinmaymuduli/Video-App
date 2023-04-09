import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Private/HomeScreen';
import LiveStreamAgora from '../screens/Private/LiveStreamAgora';
const Stack = createNativeStackNavigator();
const PrivateRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="LiveStreamAgora" component={LiveStreamAgora} />
    </Stack.Navigator>
  );
};

export default PrivateRoutes;

const styles = StyleSheet.create({});
