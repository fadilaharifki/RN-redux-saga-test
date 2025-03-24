import {StyleSheet, TextStyle, TouchableOpacity} from 'react-native';
import CustomText from './CustomText';
import colors from '../theme/color';

interface ButtonProps {
  title: string;
  variant?: 'solid' | 'outline';
  onPress: () => void;
  textStyle?: TextStyle;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  title,
  variant = 'solid',
  onPress,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'outline' ? styles.outline : styles.solid,
      ]}
      onPress={onPress}>
      <CustomText
        style={[
          styles.text,
          variant === 'outline' ? styles.textOutline : styles.textSolid,
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
    backgroundColor: colors.blueButton,
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
});

export default ButtonComponent;
