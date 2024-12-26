import {StyleSheet} from 'react-native';
import flex from './flex';
import margin from './margin';
import padding from './padding';
import gap from './gap';
import commonStyle from './commonStyle';
import colors from './colors';
export * from './colors';

// Combine All Styles Here
export const styles = StyleSheet.create({
  ...flex,
  ...margin,
  ...padding,
  ...gap,
  ...commonStyle,
  ...colors,
});
