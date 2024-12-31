import {Alert, Modal, Pressable, ScrollView, StyleSheet, Switch,
  Text, TextInput, TouchableOpacity, View} from "react-native";
import * as yup from "yup";
import {Colors, GlobalStyles} from "../../components/styles";
import {useThemeContext} from "../../provider/Theme";
import {useLanguageContext} from "../../provider/LanguageContext";
import {Formik} from "formik";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, {useState, useEffect} from "react";
import {AuthContext} from "../../provider/AuthContext";
import {SafeAreaView} from "react-native-safe-area-context";
import FetchWithRetry from "../../API/fetchWithRetry";
import {MaterialIcons} from "@expo/vector-icons";

export default function Register({navigation}) {
  const {theme} = useThemeContext();
  const styles = GlobalStyles(theme);
  const {i18n, locale} = useLanguageContext();
  const {register} = React.useContext(AuthContext);
  const registerValidationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required(i18n.t('required')),
    lastName: yup
      .string()
      .required(i18n.t('required')),
    email: yup
      .string()
      .email(i18n.t('validEmail'))
      .required(i18n.t('required')),
    password: yup
      .string()
      .required(i18n.t('required')),
    phoneNumber: yup
      .string()
      .required(i18n.t('required')),
    birthday: yup
      .string()
      .matches(/[0-9]{4}-[0-9]{2}-[0-9]{2}/, i18n.t('validDateFormat')),
    referralCode: yup
      .string(),
    hasCarLicence: yup
      .boolean(),
    hasMotorbikeLicence: yup
      .boolean()
  });

  const [hasCarLicence, setHasCarLicence] = useState(false);
  const [hasMotorbikeLicence, setHasMotorbikeLicence] = useState(false);

  const {userToken} = React.useContext(AuthContext);
  const [datas, setDatas] = useState([]);

  const onSubmit = async (values) => {
    values.birthday = date;
    values.hasCarLicence = hasCarLicence;
    values.hasMotorbikeLicence = hasMotorbikeLicence;
    try {
      await register(values);
      navigation.navigate('Login');
    }
    catch (e) {
      console.error(e);
      Alert.alert(e.message);
    }
  }

  const fetchData = async () => {
    try {
        const items = await FetchWithRetry(`http://${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/v1/person/infos`,{
            method: 'GET',
            headers: {
                "authorization": `Bearer ${await userToken()}`,
                "Content-Type": "application/json",
            },
        });
        setDatas(items)
    } catch (e) {
        setError(e.message);
    }
  };
  
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ScrollView style={{backgroundColor: Colors(theme).backgroundColor}}>
      <SafeAreaView  style={{
        ...styles.container,
      }}>
      <View style={{alignSelf: 'center', justifyContent: 'center'}}>
        <Text style={{...styles.title, textAlign:'center', marginBottom:50}}>{i18n.t('information')}</Text>
      </View>

      <Formik
        validationSchema={registerValidationSchema}
        initialValues={{
          firstName: datas.first_name,
          lastName:datas.last_name,
          email: datas.email,
          password: '',
          phoneNumber: datas.phone_number,
          hasCarLicence: datas.has_car_license,
          hasMotorbikeLicence: datas.has_motorbike_license
        }}
        onSubmit={onSubmit}
      >
        {(
          {
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
          <>
            <Text style={{...styles.label, marginBottom: -10}}>{i18n.t('firstName')}</Text>
            <View style={{
              ...styles.inputContainer,
              backgroundColor: Colors(theme).containerBackgroundColor
            }}>
              <TextInput
                name="firstName"
                style={{...styles.text, width: '90%', height:'100%'}}
                placeholder={datas.first_name}
                placeholderTextColor={Colors(theme).placeholderTextColor}
                onChangeText={handleChange('firstName')}
                value={datas.first_name}
              />
            </View>
            {errors.firstName && touched.firstName && (
              <Text style={loginStyles.errorText}>{errors.firstName}</Text>
            )}

            <Text style={{...styles.label, marginTop: 20, marginBottom: -10}}>{i18n.t('lastName')}</Text>
            <View style={{
              ...styles.inputContainer,
              backgroundColor: Colors(theme).containerBackgroundColor
            }}>
              <TextInput
                style={{...styles.text, width: '90%', height:'100%'}}
                placeholder={datas.last_name}
                placeholderTextColor={Colors(theme).placeholderTextColor}
                onChangeText={handleChange('lastName')}
                value={values.lastName}
              />
            </View>
            {errors.lastName && touched.lastName && (
              <Text style={loginStyles.errorText}>{errors.lastName}</Text>
            )}
            
            <Text style={{...styles.label, marginTop: 20, marginBottom: -10}}>{i18n.t('email')}</Text>
            <View style={{
              ...styles.inputContainer,
              backgroundColor: Colors(theme).containerBackgroundColor
            }}>
              <TextInput
                name="email"
                style={{...styles.text, width: '90%', height:'100%'}}
                placeholder={datas.email}
                placeholderTextColor={Colors(theme).placeholderTextColor}
                onChangeText={handleChange('email')}
                value={values.email}
              />
            </View>
            {errors.email && touched.email && (
              <Text style={loginStyles.errorText}>{errors.email}</Text>
            )}
            
            <Text style={{...styles.label, marginTop: 20, marginBottom: -10}}>{i18n.t('password')}</Text>
            <View style={{
              ...styles.inputContainer,
              backgroundColor: Colors(theme).containerBackgroundColor
            }}>
              <TextInput
                name="password"
                style={{...styles.text, width: '90%', height:'100%'}}
                placeholder="Strong.passw0rd"
                placeholderTextColor={Colors(theme).placeholderTextColor}
                onChangeText={handleChange('password')}
                value={values.password}
              />
            </View>
            {errors.password && touched.password && (
              <Text style={loginStyles.errorText}>{errors.password}</Text>
            )}

            <Text style={{...styles.label, marginTop: 20, marginBottom: -10}}>{i18n.t('birthday')}</Text>
            <View style={{
              ...styles.inputContainer,
              backgroundColor: Colors(theme).containerBackgroundColor
            }}>
              <TextInput
                style={{...styles.text, width: '90%', height:'100%'}}
                value={datas.birthday ? datas.birthday.split('T')[0]: datas.birthday}
              />
            </View>

            <Text style={{...styles.label, marginTop: 20, marginBottom: -10}}>{i18n.t('phoneNumber')}</Text>
            <View style={{
              ...styles.inputContainer,
              backgroundColor: Colors(theme).containerBackgroundColor
            }}>
              <TextInput
                style={{...styles.text, width: '90%', height:'100%'}}
                placeholder={datas.phone_number}
                placeholderTextColor={Colors(theme).placeholderTextColor}
                onChangeText={handleChange('phoneNumber')}
                value={values.phoneNumber}
              />
            </View>
            {errors.phoneNumber && touched.phoneNumber && (
              <Text style={loginStyles.errorText}>{errors.phoneNumber}</Text>
            )}

            <Text style={{...styles.label, marginTop: 20, marginBottom: -10}}>{i18n.t('hasCarLicence')}</Text>
            <View style={{
              ...styles.inputContainer,
              backgroundColor: Colors(theme).containerBackgroundColor
            }}>
              <Ionicons name="car-outline" color={Colors(theme).iconColor} size={25} style={loginStyles.icon} />
              <Switch
                trackColor={{true: 'rgb(75,194,10)', false: '#D32629'}}
                thumbColor={'#f4f3f4'}
                ios_backgroundColor="red"
                onValueChange={(value) => setHasCarLicence(value)}
                value={hasCarLicence}
              />
            </View>
            {errors.hasCarLicence && touched.hasCarLicence && (
              <Text style={loginStyles.errorText}>{errors.hasCarLicence}</Text>
            )}

            <Text style={{...styles.label, marginTop: 20, marginBottom: -10}}>{i18n.t('hasMotorbikeLicence')}</Text>
            <View style={{
              ...styles.inputContainer,
              backgroundColor: Colors(theme).containerBackgroundColor
            }}>
              <MaterialIcons name="two-wheeler" color={Colors(theme).iconColor} size={25} style={loginStyles.icon} />
              <Switch
                trackColor={{true: 'rgb(75,194,10)', false: '#D32629'}}
                thumbColor={'#f4f3f4'}
                ios_backgroundColor="red"
                onValueChange={(value) => setHasMotorbikeLicence(value)}
                value={hasMotorbikeLicence}
              />
            </View>
            {errors.hasMotorbikeLicence && touched.hasMotorbikeLicence && (
              <Text style={loginStyles.errorText}>{errors.hasMotorbikeLicence}</Text>
            )}

            <TouchableOpacity
              style={{...loginStyles.button, backgroundColor: Colors(theme).accentColor, marginTop: 60}}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={{...styles.subtitle, color: '#FAFDFF'}}>{i18n.t('modify')}</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      </SafeAreaView>
    </ScrollView>
  );
}
const loginStyles = StyleSheet.create({
  logo: {
    height: 270,
    width: 270,
    resizeMode: 'contain',
    marginBottom: 0,
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
  loginLink: {
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