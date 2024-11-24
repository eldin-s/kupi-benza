import { useEffect, useState, useRef } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import FullScreenImage from "./FullScreenImage";
import { useTheme } from "../../providers/ThemeProvider";

const ImageSlider = ({ images }) => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const slideIntervalRef = useRef(null);

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleOpen = () => {
    setIsModalVisible(true);
  };

  // Function to start the autoplay
  const startSlideInterval = () => {
    slideIntervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  // Function to stop the autoplay
  const stopSlideInterval = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
  };

  // Reset the autoplay interval when user interacts
  const resetSlideInterval = () => {
    stopSlideInterval();
    startSlideInterval();
  };

  // Move to the previous slide
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    resetSlideInterval(); // Reset interval on click
  };

  // Move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetSlideInterval(); // Reset interval on click
  };

  // When a thumbnail is clicked
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    resetSlideInterval(); // Reset interval on click
  };

  // Start the autoplay when the component mounts
  useEffect(() => {
    if (isModalVisible) {
      stopSlideInterval();
    } else {
      startSlideInterval();
    }

    // Clean up on unmount
    return () => stopSlideInterval();
  }, [isModalVisible]);

  return (
    <View style={styles.container}>
      {/* Main Image */}
      <TouchableOpacity onPress={handleOpen} style={styles.imageContainer}>
        <Image
          source={{ uri: images[currentIndex] }}
          style={styles.mainImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Full screen modal */}
      <FullScreenImage
        visible={isModalVisible}
        onClose={handleClose}
        imageSource={{ uri: images[currentIndex] }}
      />

      {/* Left and Right buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.bgShade }]}
          onPress={prevSlide}
        >
          <FontAwesome name="angle-left" size={24} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.bgShade }]}
          onPress={nextSlide}
        >
          <FontAwesome name="angle-right" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Thumbnails */}
      <ScrollView
        horizontal
        ref={slideIntervalRef}
        style={styles.thumbnailContainer}
        showsHorizontalScrollIndicator={false}
      >
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleThumbnailClick(index)}
          >
            <Image
              source={{ uri: image }}
              style={[
                styles.thumbnail,
                index === currentIndex ? styles.activeThumbnail : null,
              ]}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  imageContainer: {
    width: "100%",
    height: verticalScale(200),
    overflow: "hidden",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  button: {
    borderWidth: 1,
    borderColor: "#ff4605",
    padding: moderateScale(10),
    height: moderateScale(80),
    borderRadius: moderateScale(10),

    justifyContent: "center",
  },
  thumbnailContainer: {
    marginTop: 10,
    marginHorizontal: scale(30),
  },
  thumbnail: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(10),
    marginHorizontal: scale(5),
    resizeMode: "cover",
  },
  activeThumbnail: {
    borderWidth: 2,
    borderColor: "#000",
  },
});

export default ImageSlider;
