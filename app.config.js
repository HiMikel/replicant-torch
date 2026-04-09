module.exports = {
  expo: {
    name: "Replicant Torch",
    slug: "replicant-torch",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#0a0a1a"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.replicanttorch.app"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#0a0a1a"
      },
      package: "com.replicanttorch.app"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: ["expo-font"]
  }
};
