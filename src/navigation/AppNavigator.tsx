import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import CustomLoader from "src/components/common/loader/CustomLoader"
import { setLoading, setUser } from "src/redux/slices/authSlice"
import AsyncStorage from "@react-native-async-storage/async-storage"
import LoginScreen from "src/screens/Login/LoginScreen"
import RegisterScreen from "src/screens/Register/RegisterScreen"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "src/screens/Home/HomeScreen"
import { View } from "react-native"

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
  const auth = useSelector((state: unknown | any) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.user) {
      dispatch(setLoading(false))
      return
    }

    async function fetchUser() {
      let user = await AsyncStorage.getItem("user")
      user = user ? JSON.parse(user) : null
      if (user) {
        dispatch(setUser(user))
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }
    }

    fetchUser()
  }, [])

  if (auth.loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CustomLoader color="green" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={auth.user ? "Home" : "Login"}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerLeft: () => null }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerLeft: () => null }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerLeft: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
