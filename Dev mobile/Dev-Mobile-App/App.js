import TabsMenu from "./components/TabsMenu";
import {ThemeProvider} from "./provider/Theme";
import LoadStyles from "./components/styles";
import {LanguageProvider} from "./provider/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <LoadStyles/>
        <TabsMenu/>
      </ThemeProvider>
    </LanguageProvider>
  );
}

