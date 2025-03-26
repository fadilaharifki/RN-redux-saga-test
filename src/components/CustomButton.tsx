import {StyleSheet, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import CustomText from './CustomText';
import colors from '../theme/color';

interface ButtonProps {
  title: string;
  variant?: 'solid' | 'outline';
  onPress: () => void;
  textStyle?: TextStyle;
  buttonContainerStyle?: ViewStyle;
  color?: 'error' | 'info' | 'warning' | 'primary' | 'success' | 'blueDark';
  disable?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  variant = 'solid',
  color = 'blueDark',
  onPress,
  textStyle,
  buttonContainerStyle,
  disable = false,
}) => {
  const buttonColorStyle =
    variant === 'outline'
      ? {borderColor: colors[color]}
      : {backgroundColor: colors[color]};

  const textColorStyle =
    variant === 'outline' ? {color: colors[color]} : {color: 'white'};

  return (
    <TouchableOpacity
      disabled={disable}
      style={[
        styles.button,
        variant === 'outline' ? styles.outline : styles.solid,
        buttonColorStyle,
        buttonContainerStyle,
        disable ? styles.disableStyle : null,
      ]}
      onPress={onPress}>
      <CustomText
        style={[
          styles.text,
          variant === 'outline' ? styles.textOutline : styles.textSolid,
          textColorStyle,
          textStyle,
        ]}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solid: {
    backgroundColor: colors.blueDark,
  },
  outline: {
    borderWidth: 2,
    borderColor: colors.blueSky,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textSolid: {
    color: 'white',
  },
  textOutline: {
    color: colors.blueSky,
  },
  disableStyle: {
    backgroundColor: colors.grayBorder,
  },
});

export default CustomButton;
