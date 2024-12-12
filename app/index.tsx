import { Redirect } from "expo-router";
import Config from "./config";

export default function Index() {
  if (!Config.token) {
    return <Redirect href="/login" />;
  }
  
  return <Redirect href="/(tabs)/friends" />
}
