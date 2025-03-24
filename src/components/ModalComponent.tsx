import {
  Modal,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import CustomText from './CustomText';

interface ModalComponentProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  footer?: React.ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  visible,
  onClose,
  children,
  title,
  containerStyle,
  titleStyle,
  footer,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onClose;
      }}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, containerStyle]}>
            {title && (
              <CustomText style={[styles.modalTitle, titleStyle]}>
                {title}
              </CustomText>
            )}
            <View>{children}</View>
            {footer && <View>{footer}</View>}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    gap: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ModalComponent;
