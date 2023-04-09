import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type PublicRoutesTypes = {};

export type BottomTabsTypes = {};
export type PrivateRoutesTypes = {
  HomeScreen: undefined;
  LiveStreamAgora: undefined;
};

export type PublicNavigationProps =
  NativeStackNavigationProp<PublicRoutesTypes>;
export type PrivateNavigationProps =
  NativeStackNavigationProp<PrivateRoutesTypes>;
export type StackAndTabType = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsTypes>,
  NativeStackNavigationProp<PrivateRoutesTypes>
>;
