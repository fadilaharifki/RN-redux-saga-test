import React, {useEffect, useState} from 'react';
import {TextInput, View, Text, StyleSheet, ViewStyle} from 'react-native';
import colors from '../theme/color';
import {useController, Control, ControllerRenderProps} from 'react-hook-form';
import CustomText from './CustomText';
import {formatNumber} from '../utils/formatNumber';

interface CustomInputProps {
  prefix?: string;
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  control?: Control<any>;
  name: string;
  label?: string;
  rules?: Record<string, any>;
  type?: 'text' | 'number';
  isFormatNumber?: boolean;
  customStyleInput?: ViewStyle;
  disable?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  prefix,
  placeholder,
  value,
  onChange,
  control,
  name,
  label,
  rules,
  type = 'text',
  isFormatNumber = false,
  customStyleInput,
  disable,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const {
    field,
    fieldState: {invalid, error},
  } = control
    ? useController({
        name,
        control,
        rules,
      })
    : {field: {value}, fieldState: {}};

  const fieldWithOnChange = field as ControllerRenderProps<any, string>;

  const handleChange = (text: string) => {
    if (control && fieldWithOnChange?.onChange) {
      fieldWithOnChange.onChange(text);
    }
    if (typeof onChange === 'function') {
      onChange(text);
    }
  };

  useEffect(() => {
    if (value) {
      fieldWithOnChange.onChange(value);
    }
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelGroup}>
        <CustomText style={[styles.label]}>{label}</CustomText>
        {rules?.required && <CustomText style={styles.asterisk}>*</CustomText>}
      </View>

      <View
        style={[
          styles.inputContainer,
          isFocused && {borderColor: colors.blueSky},
          invalid && styles.inputError,
          disable && {backgroundColor: colors.grayBorder},
          customStyleInput,
        ]}>
        {prefix && field.value && (
          <CustomText style={styles.prefix}>{prefix}</CustomText>
        )}
        <TextInput
          style={[styles.input]}
          value={
            type === 'number' && isFormatNumber
              ? formatNumber(field?.value || '')
              : field?.value
          }
          onChangeText={handleChange}
          placeholder={placeholder}
          keyboardType={type === 'number' ? 'numeric' : 'default'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disable}
        />
      </View>

      {invalid && error && (
        <Text style={styles.errorText}>{error.message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    marginBottom: 5,
  },
  labelError: {
    color: colors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  prefix: {
    fontSize: 16,
    color: colors.grayTextTitle,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 5,
  },
  labelGroup: {flexDirection: 'row', gap: 5},
  asterisk: {
    color: colors.error,
  },
});

export default CustomInput;
