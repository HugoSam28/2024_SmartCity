import {createContext, useState, useEffect, useContext} from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [userThemeChoice, setUserThemeChoice] = useState('auto');
  const [currentTheme, setCurrentTheme] = useState('');

  useEffect(() => {
    if (userThemeChoice === 'auto') {
      setCurrentTheme(systemTheme);
    } else {
      setCurrentTheme(userThemeChoice);
    }
  }, [userThemeChoice, systemTheme]);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, userThemeChoice, setTheme: setUserThemeChoice }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);


/*
 !!!!!! Comment appliquer le theme :

import { GlobalStyles, Colors } from "../components/styles";
import { useContext } from "react";
import useThemeContext from "../provider/Theme";

export const myComponent(){
  const {theme} = useThemeContext();
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
        iconColor: Colors(theme).accentColor
        // autres props
      />
      // reste du code
    </View>
  )
}

cfr: /components/styles.jsx

 */