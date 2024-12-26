import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import logo from '../assets/logo.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Formik } from 'formik';
import * as yup from 'yup';
import {AuthContext} from "../provider/AuthContext";
import {useThemeContext} from "../provider/Theme";
import {Colors, GlobalStyles} from "../components/styles";
import {useLanguageContext} from "../provider/LanguageContext";

export default function Login({navigation}) {
  const { logIn } = React.useContext(AuthContext);
  const {theme} = useThemeContext();
  const styles = GlobalStyles(theme);
  const {i18n} = useLanguageContext();

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email(i18n.t('validEmail'))
      .required(i18n.t('required')),
    password: yup
      .string()
      .required(i18n.t('required')),
  });
  const onSubmit = async (values) => {
    try {
      await logIn(values);
    }
    catch (e) {
      console.error(e);
      Alert.alert(e.message);
    }
  }

  return (
    <View style={{
      ...styles.container,
      flex:1,
      justifyContent: 'center',
      marginTop: -80
    }}>
      <View style={{alignSelf: 'center', justifyContent: 'center'}}>
        <Image source={logo} style={loginStyles.logo} />
        <Text style={{...styles.title, textAlign:'center', marginTop:-20, marginBottom:60}}>{i18n.t('logIn')}</Text>
      </View>

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={onSubmit}
      >
        {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
          <>
            <Text style={{...styles.label, marginBottom: -10}}>{i18n.t('email')}</Text>
            <View style={{
              ...loginStyles.inputContainer,
              backgroundColor: Colors(theme).containerBackgroundColor
            }}>
              <Ionicons name="mail-outline" color={Colors(theme).iconColor} size={25} style={loginStyles.icon} />
              <TextInput
                style={{...styles.text, width: '90%', height:'100%'}}
                placeholder="john.smith@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            {errors.email && touched.email && (
              <Text style={loginStyles.errorText}>{errors.email}</Text>
            )}

            <Text style={{...styles.label, marginTop: 20, marginBottom: -10}}>{i18n.t('password')}</Text>
            <View style={{
              ...loginStyles.inputContainer,
              backgroundColor: Colors(theme).containerBackgroundColor
            }}>
              <Ionicons name="lock-closed-outline" color={Colors(theme).iconColor} size={25} style={loginStyles.icon} />
              <TextInput
                style={{...styles.text, width: '90%', height:'100%'}}
                placeholder="Strong.passw0rd"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            {errors.password && touched.password && (
              <Text style={loginStyles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity
              style={{...loginStyles.button, backgroundColor: Colors(theme).accentColor}}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={{...styles.subtitle, color: '#FAFDFF'}}>{i18n.t('logIn')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.text}>
                {i18n.t('noAccount')} <Text style={loginStyles.registerLink}>{i18n.t('register')}</Text>
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}

const loginStyles = StyleSheet.create({
  logo: {
    height: 270,
    width: 270,
    resizeMode: 'contain',
    marginBottom: 0,
    textAlign:'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  icon: {
    marginRight: 8,
  },
  button: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:20
  },
  registerLink: {
    color: Colors().accentColor,
    fontFamily: 'RobotoMonoBold',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 2
  },
});
