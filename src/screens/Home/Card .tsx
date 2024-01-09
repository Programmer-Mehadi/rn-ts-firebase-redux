import React from "react"
import { View, Text, StyleSheet } from "react-native"

const Card = ({
  data = {
    userId: 0,
    id: 0,
    title: "",
    completed: false,
  },
}: {
  data: {
    userId: number
    id: number
    title: string
    completed: boolean
  }
}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.userId}>User ID: {data.userId}</Text>
      <Text
        style={[
          styles.completed,
          { color: data.completed ? "#00b300" : "#ff0000" },
        ]}
      >
        {data.completed ? "Completed" : "Not Completed"}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    padding: 16,
    width: "24%",
    borderRadius: 8,
    margin: 8,
    elevation: 2, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOffset: { width: 0, height: 2 }, // for iOS shadow
    shadowOpacity: 0.1, // for iOS shadow,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  userId: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  completed: {
    fontSize: 14,
    fontWeight: "bold",
  },
})

export default Card
