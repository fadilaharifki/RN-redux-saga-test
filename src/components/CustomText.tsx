import colors from '../theme/color';
import {StyleSheet, Text, TextProps} from 'react-native';
import {getFontFamily} from '../theme/typography';

interface CustomTextProps extends TextProps {
  size?: number;
  weight?:
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  lineHeight?: number;
  color?: string;
}

const CustomText: React.FC<CustomTextProps> = ({
  size = 13,
  weight,
  lineHeight = 25,
  color,
  style,
  children,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles.default,
        {fontSize: size, fontFamily: getFontFamily(weight), lineHeight, color},
        style,
      ]}
      {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 13,
    lineHeight: 25,
    color: colors.primary,
  },
});

export default CustomText;
