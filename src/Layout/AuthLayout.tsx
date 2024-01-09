import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import CustomLoader from "src/components/common/loader/CustomLoader"
import { setLoading, setUser } from "src/redux/slices/authSlice"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { View, StyleSheet } from "react-native"

const AuthLayout = ({
  navigation,
  children,
}: {
  navigation: any
  children: React.ReactNode
}) => {
  // redux state and dispatch
  const auth = useSelector((state: unknown | any) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("auth", auth)
    console.log("auth useEffect")
    dispatch(setLoading(true))
    if (auth.user) return
    async function fetchUser() {
      let user = await AsyncStorage.getItem("user")
      user = user ? JSON.parse(user) : null
      if (user) {
        dispatch(setUser(user))
        dispatch(setLoading(false))
      } else {
        navigation.navigate("Login")
      }
    }
    fetchUser()
  }, [auth.loading])

  if (auth.user == null && auth.loading) {
    return (
      <View style={styles.container}>
        <CustomLoader color="green" />
      </View>
    )
  }

  return <>{children}</>
}

export default AuthLayout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
