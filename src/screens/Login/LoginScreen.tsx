import { Button, StyleSheet, Text, View } from "react-native"
import React, { useEffect } from "react"
import CustomLoader from "src/components/common/loader/CustomLoader"
import AsyncStorage from "@react-native-async-storage/async-storage"

function LoginScreen({ navigation }: { navigation: any }) {
  // user check and navigation start
  const [userLoading, setUserLoading] = React.useState(true)
  async function fetchUser() {
    setUserLoading(true)
    const localUser = await AsyncStorage.getItem("user")
    if (localUser) {
      setUserLoading(false)
      return navigation.navigate("Home")
    } else {
      setUserLoading(false)
    }
  }
  useEffect(() => {
    fetchUser()
    return () => {
      setUserLoading(true)
      fetchUser()
    }
  }, [])
  // user check and navigation end
  if (userLoading) {
    return (
      <View style={styles.container}>
        <CustomLoader color="green" text="Login Loading..." />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text>LoginScreen</Text>
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    )
  }
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
