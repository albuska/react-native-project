import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";

const MapScreen = ({ route }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    try {
      if (route.params) {
        setLatitude(route.params.item.geolocation.latitude);
        setLongitude(route.params.item.geolocation.longitude);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      {latitude && longitude ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
          />
        </MapView>
      ) : (
        <Text>Sorry, location doesn't worked...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default MapScreen;
