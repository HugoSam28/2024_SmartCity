import TabsMenu from "./components/TabsMenu";
import { useColorScheme } from "react-native";
import ThemeContext from "./provider/Theme";

export default function App() {
  const theme = useColorScheme();
  return (
    <ThemeContext.Provider value={theme}>
      <TabsMenu/>
    </ThemeContext.Provider>
  );
}

