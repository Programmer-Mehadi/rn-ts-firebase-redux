import { StyleSheet, Text, View } from "react-native"
import React from "react"

const InputError = ({ text = "" }) => {
  return <Text style={styles.title}>{text}</Text>
}

export default InputError

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ff0000",
    marginVertical: 4,
  },
})
