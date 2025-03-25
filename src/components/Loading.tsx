import React from 'react';
import {View, Text, Modal, ActivityIndicator, StyleSheet} from 'react-native';
import colors from '../theme/color';

interface LoadingModalProps {
  isVisible: boolean;
  message?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({
  isVisible,
  message = 'Loading...',
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={() => {}}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color={colors.blueDark} />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
  },
});

export default LoadingModal;
