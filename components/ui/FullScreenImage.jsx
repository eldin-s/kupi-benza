import React, { useState } from "react";
import { useTheme } from "../../providers/ThemeProvider";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";

const FullScreenImage = ({ visible, onClose, images, currentIndex, onChangeImage }) => {
  const { theme } = useTheme();

  const [swipeDirection, setSwipeDirection] = useState(null);

  // Gesture Handler for Swipe
  const onGestureEvent = (event) => {
    if (event.nativeEvent.translationX < -50) {
      // Swipe left
      setSwipeDirection("left");
    } else if (event.nativeEvent.translationX > 50) {
      // Swipe right
      setSwipeDirection("right");
    }
  };

  const handleSwipe = () => {
    if (swipeDirection === "left") {
      onChangeImage("next");
    } else if (swipeDirection === "right") {
      onChangeImage("prev");
    }
    setSwipeDirection(null); // Reset swipe direction after action
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <GestureHandlerRootView style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Zatvori</Text>
        </TouchableOpacity>

        <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={handleSwipe}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: images[currentIndex] }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </PanGestureHandler>

        {/* Full-Screen Navigation Buttons */}
        {/* <TouchableOpacity
          style={[styles.navButton, { left: 20 }]}
          onPress={() => onChangeImage("prev")}
        >
          <Text style={[styles.navButtonText, { color: theme.text }]}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, { right: 20 }]}
          onPress={() => onChangeImage("next")}
        >
          <Text style={[styles.navButtonText, { color: theme.text }]}>{"<"}</Text>
        </TouchableOpacity> */}
      </GestureHandlerRootView>
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
  imageContainer: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  navButton: {
    position: "absolute",
    top: "50%",
    padding: 10,
    zIndex: 10,
  },
  navButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default FullScreenImage;
