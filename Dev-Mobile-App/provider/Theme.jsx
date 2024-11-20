import { createContext } from 'react';

const ThemeContext = createContext('light');

export default ThemeContext;

/*
 !!!!!! Comment appliquer le theme :

import { GlobalStyles, colors } from "../components/styles";
import { useContext } from "react";
import ThemeContext from "../provider/Theme";

export const myComponent(){
  const theme = useContext(ThemeContext);
  const styles = GlobalStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ceci est un titre</Text>
      <Text style={styles.subtitle}>Je suis un SOUS-titre</Text>
      <Text style={styles.text}>
        Le reste:
        Le corps du texte (et pas du Christ 👀)
      </Text>
      <Another Component
        iconColor: colors(theme).accentColor
        // autre props
      />
      // reste du code
    </View>
  )
}


cfr: /components/styles.jsx

 */