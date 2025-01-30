module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!react-redux|@react-native|react-native|expo|expo-modules-core|@expo/vector-icons/.*)",
  ],
};
