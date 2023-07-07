import { View, Text, StyleSheet } from "react-native";
import { selectUser } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const user = useSelector(selectUser); 
  console. log("user ----->", user)
  return (
    <View style={styles.container}>
      <Text>ProfileScreen Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default ProfileScreen;
