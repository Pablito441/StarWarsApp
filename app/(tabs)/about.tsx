import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function About() {
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const sendEmail = () => {
    const email = "pablocaceres441@gmail.com";
    const subject = encodeURIComponent("Feedback about StarWarsExpo App");
    const body = encodeURIComponent("Hi Pablo,\n\n");
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
    Linking.openURL(mailtoUrl).catch((err) =>
      console.error("Failed to open email client:", err)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This Application</Text>
      <Text style={styles.description}>
        This app was developed by Pablo Cáceres using Expo React Native. I love
        creating intuitive and easy-to-use apps. Did you like it? If you have
        any problems or suggestions for improvements, please feel free to
        contact me by email. Your feedback is invaluable and helps me
        continually improve my work. Thank you for using this app!
      </Text>
      <Text style={styles.techUsed}>
        Technologies Used: Expo, React Native, TypeScript, JavaScript
      </Text>
      <TouchableOpacity style={styles.emailButton} onPress={sendEmail}>
        <Text style={styles.emailButtonText}>Contact me by email</Text>
      </TouchableOpacity>
      <Text style={styles.socialLinks}>Follow me on social media:</Text>
      <View style={styles.socialLinkContainer}>
        <TouchableOpacity
          onPress={() => openLink("https://www.instagram.com/imblittoo/")}
        >
          <Ionicons name="logo-instagram" size={30} color="#988EE4" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openLink(
              "https://www.linkedin.com/in/pablo-c%C3%A1ceres-06638a32a/"
            )
          }
        >
          <AntDesign name="linkedin-square" size={30} color="#988EE4" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#988EE4",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
  },
  techUsed: {
    fontSize: 14,
    color: "#ffffff",

    textAlign: "center",
    marginBottom: 10,
  },
  emailButton: {
    backgroundColor: "#988EE4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  emailButtonText: {
    color: "#0A0A0A",
    fontWeight: "bold",
    fontSize: 16,
  },
  socialLinks: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 5,
  },
  socialLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 75,
    paddingVertical: 20,
  },
});
