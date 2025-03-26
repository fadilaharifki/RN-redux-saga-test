import React, {useEffect, useState} from 'react';
import {Control, ControllerRenderProps, useController} from 'react-hook-form';
import {
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomText from './CustomText';
import CustomInput from './CustomInput';
import colors from '../theme/color';
import IconButton from './IconButton';

interface CustomSelectProps {
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  control?: Control<any>;
  name: string;
  label?: string;
  rules?: Record<string, any>;
  options?: {value: string; label: string}[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  placeholder,
  value,
  onChange,
  control,
  name,
  label,
  rules,
  options = [],
}) => {
  const {
    field,
    fieldState: {error},
  } = control
    ? useController({
        name,
        control,
        rules,
      })
    : {field: {value}, fieldState: {}};

  const [selectedLabel, setSelectedLabel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const filteredCountries = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const fieldWithOnChange = field as ControllerRenderProps<any, string>;

  useEffect(() => {
    const selectedProduct = options.find(
      p => p.value.toString() === field.value,
    );
    setSelectedLabel(selectedProduct?.label as string);
  }, [field.value]);

  const handleOnchange = (option: {label: string; value: string}) => {
    if (option) {
      fieldWithOnChange.onChange(option.value);
      setSelectedLabel(option.label);
      setModalVisible(false);
      if (typeof onChange === 'function') {
        onChange(option.value);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelGroup}>
        <CustomText style={[styles.label]}>{label}</CustomText>
        {rules?.required && <CustomText style={styles.asterisk}>*</CustomText>}
      </View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.selectButton, error && {borderColor: colors.error}]}>
        <CustomText style={styles.selectButtonText}>
          {selectedLabel || placeholder}
        </CustomText>
        <View style={{flexDirection: 'row'}}>
          {field.value && (
            <IconButton
              onPress={() => {
                fieldWithOnChange.onChange('');
                setSelectedLabel('');

                if (typeof onChange === 'function') {
                  onChange('');
                }
              }}
              name="xmark"
              size={20}
            />
          )}
          {modalVisible ? (
            <IconButton name="angle-up" size={20} />
          ) : (
            <IconButton name="angle-down" size={20} />
          )}
        </View>
      </TouchableOpacity>
      {error && (
        <CustomText style={styles.errorText}>{error.message}</CustomText>
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.modalContent,
                filteredCountries.length === 0 && styles.modalContentNoResults,
              ]}>
              <CustomInput
                name="searc"
                placeholder="Search..."
                value={searchQuery}
                onChange={setSearchQuery}
                customStyleInput={{backgroundColor: 'white'}}
              />

              <FlatList
                data={filteredCountries}
                keyExtractor={item => item.value}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => handleOnchange(item)}
                    style={styles.listItem}>
                    <CustomText>{item.label}</CustomText>
                  </TouchableOpacity>
                )}
                style={styles.listContainer}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  selectButton: {
    borderColor: colors.grayBorder,
    borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  selectButtonText: {
    fontSize: 16,
    color: colors.primary,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    maxHeight: 400,
  },
  modalContentNoResults: {
    maxHeight: 200,
  },

  listContainer: {
    maxHeight: 300,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayBorder,
  },
  labelGroup: {flexDirection: 'row', gap: 5},
  asterisk: {
    color: colors.error,
  },
});

export default CustomSelect;
