import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { BACK_END_URL } from "@env";

const Home = () => {
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(BACK_END_URL);
      const data = await response.json();
      setMessage(data.message);
      console.log("Response from the backend:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <Text> {message}</Text>
    </View>
  );
};

export default Home;
