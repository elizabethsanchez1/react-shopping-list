import { Alert } from "react-native";


export function displayAlert(title, message) {
  Alert.alert(
    title,
    message,
    [ {text: 'OK'} ],
  );
}
