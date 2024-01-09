import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import React, { useEffect } from "react"
import InputError from "src/components/elements/Errors/InputError"
import InputLabel from "src/components/elements/Labels/InputLabel"
import InputText from "src/components/elements/Inputs/InputText"
import SecureInputText from "src/components/elements/Inputs/SecureInputText"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useDispatch } from "react-redux"
import { setLoading, setUser } from "src/redux/slices/authSlice"

import CustomLoader from "src/components/common/loader/CustomLoader"

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch()

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

  const [errors, setErrors] = React.useState({
    fullName: {
      hasError: false,
      message: "",
    },
    email: {
      hasError: false,
      message: "",
    },
    password: {
      hasError: false,
      message: "",
    },
    phoneNumber: {
      hasError: false,
      message: "",
    },
    confirmPassword: {
      hasError: false,
      message: "",
    },
  })

  const [data, setData] = React.useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
  })

  const setCustomData = (field: string, text: string | "") => {
    if (field in data) {
      setData({
        ...data,
        [field]: text,
      })
    }
  }

  async function handleSubmit() {
    const newError = {
      fullName: {
        hasError: data.fullName.length === 0 ? true : false,
        message: data.fullName.length === 0 ? "Name is required" : "",
      },
      email: {
        hasError: data.email.length === 0 ? true : false,
        message: data.email.length === 0 ? "Email is required" : "",
      },
      password: {
        hasError: data.password.length === 0 ? true : false,
        message: data.password.length === 0 ? "Password is required" : "",
      },
      phoneNumber: {
        hasError: data.phoneNumber.length === 0 ? true : false,
        message:
          data.phoneNumber.length === 0 ? "Phone number is required" : "",
      },
      confirmPassword: {
        hasError:
          data.confirmPassword.length === 0
            ? true
            : data.password !== data.confirmPassword
            ? true
            : false,
        message:
          data.password !== data.confirmPassword
            ? "Password does not match"
            : data.confirmPassword.length === 0
            ? "Confirm password is required"
            : "",
      },
    }
    setErrors(newError)
    if (
      newError.confirmPassword.hasError ||
      newError.email.hasError ||
      newError.fullName.hasError ||
      newError.password.hasError ||
      newError.phoneNumber.hasError
    ) {
      return
    }

    await AsyncStorage.setItem("user", JSON.stringify(data))
    dispatch(setUser(data))
    dispatch(setLoading(false))
    navigation.navigate("Home")
  }
  if (userLoading) {
    return (
      <View style={styles.container}>
        <CustomLoader color="green" text="Register Loading..." />
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View
          style={{
            flex: 1,
            height: "100%",
          }}
        >
          <View style={styles.body}>
            <Text style={styles.title}>Register Here</Text>
            <View style={styles.formContainer}>
              <InputLabel text="Full Name" />
              <InputText
                setCustomData={setCustomData}
                errors={errors.fullName}
                value={data.fullName}
                field="fullName"
                placeholder="Enter your full name"
              />
              {errors.fullName.hasError && (
                <InputError text={errors.fullName.message} />
              )}
            </View>
            <View style={styles.formContainer}>
              <InputLabel text="Email" />
              <InputText
                setCustomData={setCustomData}
                errors={errors.email}
                value={data.email}
                field="email"
                placeholder="Enter your email"
              />
              {errors.email.hasError && (
                <InputError text={errors.email.message} />
              )}
            </View>
            <View style={styles.formContainer}>
              <InputLabel text="Password" />
              <SecureInputText
                setCustomData={setCustomData}
                errors={errors.password}
                value={data.password}
                field="password"
                placeholder="Enter your password"
              />
              {errors.password.hasError && (
                <InputError text={errors.password.message} />
              )}
            </View>
            <View style={styles.formContainer}>
              <InputLabel text="Confirm Password" />
              <SecureInputText
                setCustomData={setCustomData}
                errors={errors.confirmPassword}
                value={data.confirmPassword}
                field="confirmPassword"
                placeholder="Enter your password again"
              />
              {errors.confirmPassword.hasError && (
                <InputError text={errors.confirmPassword.message} />
              )}
            </View>
            <View style={styles.formContainer}>
              <InputLabel text="Phone Number" />
              <InputText
                setCustomData={setCustomData}
                errors={errors.phoneNumber}
                value={data.phoneNumber}
                field="phoneNumber"
                placeholder="Enter your phone number"
              />
              {errors.phoneNumber.hasError && (
                <InputError text={errors.phoneNumber.message} />
              )}
            </View>
            <View style={styles.formContainer}>
              <Button title="Register" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#b3ffb3",
    paddingVertical: 50,
  },

  body: {
    flex: 1,
    width: "100%",
    height: "auto",
    maxWidth: 600,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    gap: 16,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.05)",
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#00b300",
  },
  formContainer: {
    backgroundColor: "#fff",
    gap: 2,
  },
})
