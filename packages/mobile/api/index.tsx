import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { backend_url } from "@/config";

export const Home = () => {
  const [message, setMessage] = useState("");

  const fetchData = axios({
    method: "get",
    url: backend_url,
    responseType: "json",
  })
    .then(function (response: AxiosResponse) {
      const data = response.data;
      setMessage(data.message);
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
    });

  useEffect(() => {
    fetchData;
  }, []);

  return <Text>{message}</Text>;
};
