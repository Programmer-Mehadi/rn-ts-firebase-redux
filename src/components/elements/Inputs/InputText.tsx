import { StyleSheet, Text, TextInput, View } from "react-native"
import React from "react"

const InputText = ({
  value = "",
  field = "",
  setCustomData = (field: string, text: string | "") => {},
  errors = {
    hasError: false,
    message: "",
  },
  placeholder = "",
  style = {},
}) => {
  return (
    <TextInput
      style={{
        ...styles.input,
        ...style,
        borderColor: errors.hasError ? "#ff0000" : "#ccc",
      }}
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => setCustomData(field, text)}
    />
  )
}

export default InputText

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
  },
})
