/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';

import Routes from './src/Routes';
import {NavigationContainer} from '@react-navigation/native';

function App(): JSX.Element {
  return (
    <>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});

export default App;
