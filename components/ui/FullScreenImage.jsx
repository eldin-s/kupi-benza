import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";

const FullScreenImage = ({ visible, onClose, imageSource }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Zatvori</Text>
        </TouchableOpacity>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 10,
    zIndex: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default FullScreenImage;
