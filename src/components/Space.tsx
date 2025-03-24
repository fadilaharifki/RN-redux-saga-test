import React from 'react';
import {View} from 'react-native';

interface SpaceProps {
  size?: number;
  horizontal?: boolean;
}

const Space: React.FC<SpaceProps> = ({size = 8, horizontal = false}) => {
  return <View style={horizontal ? {width: size} : {height: size}} />;
};

export default Space;
