import TabsMenu from "./components/TabsMenu";
import { useColorScheme } from "react-native";
import ThemeContext from "./provider/Theme";
import LoadStyles from "./components/styles";
import {PaperProvider} from "react-native-paper";

export default function App() {
  const theme = useColorScheme();
  return (
    <PaperProvider>
      <ThemeContext.Provider value={theme}>
        <LoadStyles/>
        <TabsMenu/>
      </ThemeContext.Provider>
    </PaperProvider>
  );
}

