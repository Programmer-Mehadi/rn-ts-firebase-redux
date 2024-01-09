import { StyleSheet, Text, View } from "react-native"
import React from "react"

const CustomLoader = ({ color = "black", text = "Loading..." }) => {
  return <Text style={[styles.title, { color: color }]}>{text}</Text>
}

export default CustomLoader

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
})
