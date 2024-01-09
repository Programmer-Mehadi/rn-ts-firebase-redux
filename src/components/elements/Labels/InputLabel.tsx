import { StyleSheet, Text, View } from "react-native"
import React from "react"

const InputLabel = ({ text = "", customStyle = {} }) => {
  return <Text style={{ ...styles.title, ...customStyle }}>{text}</Text>
}

export default InputLabel

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
})
