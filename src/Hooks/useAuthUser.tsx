import { useSelector } from "react-redux"

import AsyncStorage from "@react-native-async-storage/async-storage"

const useAuthUser = async () => {
  const auth = useSelector((state: unknown | any) => state.auth)

  try {
    console.log("auth", auth)
    if (auth.user) {
      return [true, auth.user]
    }
    const user = await AsyncStorage.getItem("user")
    const parsedUser = user ? JSON.parse(user) : null
    if (parsedUser) {
      return [true, parsedUser]
    } else {
      return [false, null]
    }
  } catch (error) {
    console.error("Error in useAuthUser:", error)
    return [false, null]
  }
}

export default useAuthUser
