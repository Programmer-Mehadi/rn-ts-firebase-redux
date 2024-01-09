import { Button, ScrollView, StyleSheet, Text, View } from "react-native"
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import CustomLoader from "src/components/common/loader/CustomLoader"
import { setLoading, setUser } from "src/redux/slices/authSlice"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Card from "src/screens/Home/Card "

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const auth = useSelector((state: unknown | any) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.user) return
    dispatch(setLoading(true))
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

    return () => {}
  }, [auth.loading])

  const [userList, setUserList] = React.useState([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setUserList(json)
      })
  }, [])

  if (auth.user == null && auth.loading) {
    return (
      <View style={styles.container}>
        <CustomLoader color="green" />
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>HomeScreen</Text>
        {auth.user ? (
          <View style={{ padding: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                title="Logout"
                color={"red"}
                onPress={() => {
                  AsyncStorage.removeItem("user").then(() => {
                    dispatch(setUser(null)),
                      dispatch(setLoading(false)),
                      navigation.navigate("Login")
                  })
                }}
              />
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {userList.map((user: any) => (
                <Card key={user.id} data={user} />
              ))}
            </View>
          </View>
        ) : (
          <>
            <Button
              title="Login"
              onPress={() => navigation.navigate("Login")}
            />
            <Button
              title="Register"
              color={"green"}
              onPress={() => navigation.navigate("Register")}
            />
          </>
        )}
      </View>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
