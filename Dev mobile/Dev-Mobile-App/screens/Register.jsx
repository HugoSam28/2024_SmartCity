import {Alert, Modal, Pressable, ScrollView, StyleSheet, Switch,
  Text, TextInput, TouchableOpacity, View} from "react-native";
import * as yup from "yup";
import {Colors, GlobalStyles} from "../components/styles";
import {useThemeContext} from "../provider/Theme";
import {useLanguageContext} from "../provider/LanguageContext";
import {Formik} from "formik";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from '@expo/vector-icons/Feather';
import React, {useState} from "react";
import {AuthContext} from "../provider/AuthContext";
import {SafeAreaView} from "react-native-safe-area-context";
import DateTimePicker from "react-native-ui-datepicker/src/DateTimePicker";
import dayjs from "dayjs";
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

  const [openModal, setOpenModal] = useState(false);
  const [date, setDate] = useState(dayjs().add(-16, 'year').format('YYYY-MM-DD'));
  const [hasCarLicence, setHasCarLicence] = useState(false);
  const [hasMotorbikeLicence, setHasMotorbikeLicence] = useState(false);

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
  return (
    <ScrollView style={{backgroundColor: Colors(theme).backgroundColor}}>
      <SafeAreaView  style={{
        ...styles.container,
      }}>
      <View style={{alignSelf: 'center', justifyContent: 'center'}}>
        <Text style={{...styles.title, textAlign:'center', marginBottom:50}}>{i18n.t('register')}</Text>
      </View>

      <Formik
        validationSchema={registerValidationSchema}
        initialValues={{
          firstName: '',
          lastName:'',
          email: '',
          password: '',
          phoneNumber: '',
          birthday: '',
          referralCode: '',
          hasCarLicence,
          hasMotorbikeLicence
        }}
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
            <Text style={{...styles.label, marginBottom: -10}}>{i18n.t('firstName')}</Text>
            <View style={{
              ...styles.inputContainer,
              backgroundColor: Colors(theme).containerBackgroundColor
            }}>
              <Ionicons name="person-outline" color={Colors(theme).iconColor} size={25} style={loginStyles.icon} />
              <TextInput
                style={{...styles.text, width: '90%', height:'100%'}}
                placeholder="John"
                placeholderTextColor={Colors(theme).placeholderTextColor}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
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
              <Ionicons name="person-outline" color={Colors(theme).iconColor} size={25} style={loginStyles.icon} />
              <TextInput
                style={{...styles.text, width: '90%', height:'100%'}}
                placeholder="Smith"
                placeholderTextColor={Colors(theme).placeholderTextColor}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
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
              <Ionicons name="mail-outline" color={Colors(theme).iconColor} size={25} style={loginStyles.icon} />
              <TextInput
                style={{...styles.text, width: '90%', height:'100%'}}
                placeholder="john.smith@gmail.com"
                placeholderTextColor={Colors(theme).placeholderTextColor}
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
              ...styles.inputContainer,
              backgroundColor: Colors(theme).containerBackgroundColor
            }}>
              <Ionicons name="lock-closed-outline" color={Colors(theme).iconColor} size={25} style={loginStyles.icon} />
              <TextInput
                style={{...styles.text, width: '90%', height:'100%'}}
                placeholder="Strong.passw0rd"
                placeholderTextColor={Colors(theme).placeholderTextColor}
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            {errors.password && touched.password && (
              <Text style={loginStyles.errorText}>{errors.password}</Text>
            )}

            <Text style={{...styles.label, marginTop: 20, marginBottom: -10}}>{i18n.t('phoneNumber')}</Text>
            <View style={{
              ...styles.inputContainer,
              backgroundColor: Colors(theme).containerBackgroundColor
            }}>
              <Ionicons name="call-outline" color={Colors(theme).iconColor} size={25} style={loginStyles.icon} />
              <TextInput
                style={{...styles.text, width: '90%', height:'100%'}}
                placeholder="+32123456789"
                placeholderTextColor={Colors(theme).placeholderTextColor}
                keyboardType={'phone-pad'}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
              />
            </View>
            {errors.phoneNumber && touched.phoneNumber && (
              <Text style={loginStyles.errorText}>{errors.phoneNumber}</Text>
            )}

            <Text style={{...styles.label, marginTop: 20, marginBottom: -10}}>{i18n.t('birthday')}</Text>
            <View style={{
              ...styles.inputContainer,
              backgroundColor: Colors(theme).containerBackgroundColor
            }}>
              <Ionicons name="calendar-outline" color={Colors(theme).iconColor} size={25} style={loginStyles.icon} />
              <Modal
                animationType="slide"
                visible={openModal}
                transparent={true}
                onRequestClose={() => {
                  console.log('Modal has been closed.');
                  setOpenModal(false);
                }}>
                <View style={{
                  flex:1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:'rgba(28, 35, 53, 0.75)'
                }}>
                  <View style={{
                    margin: 20,
                    backgroundColor: Colors(theme).containerBackgroundColor,
                    borderRadius: 20,
                    padding: 35,
                    alignItems: 'center',
                    shadowColor: Colors(theme).shadowColor,
                    shadowOpacity: 0.3,
                    shadowRadius: 10,}} >
                    <DateTimePicker
                      mode="single"
                      date={date}
                      onChange={(params) => setDate(dayjs(params.date).format('YYYY-MM-DD'))}
                      firstDayOfWeek={1}
                      maxDate={dayjs().add(-16, 'year')}
                      height={275}
                      locale={locale}
                      calendarTextStyle={{color:Colors(theme).text}}
                      selectedItemColor={`${Colors(theme).accentColor}`}
                      headerTextContainerStyle={{backgroundColor: Colors(theme).containerInArrayColor}}
                      headerTextStyle={{...styles.subtitle, fontSize: 25, fontFamily: 'RobotoCondensedBold'}}
                      headerButtonStyle={{
                        backgroundColor: Colors(theme).containerInArrayColor,
                        borderRadius:6
                      }}
                      headerButtonColor={Colors(theme).accentColor}
                      headerButtonSize={22}
                      headerButtonsPosition={'right'}
                      monthContainerStyle={{backgroundColor: Colors(theme).containerInArrayColor, borderWidth:0}}
                      yearContainerStyle={{backgroundColor: Colors(theme).containerInArrayColor, borderWidth:0}}
                    />
                    <Pressable
                      style={{
                        borderRadius: 8,
                        padding: 10,
                        elevation: 2,
                        backgroundColor: Colors(theme).accentColor
                      }}
                      onPress={() => setOpenModal(false)}
                    >
                      <Text style={{...styles.text, fontSize:18, color: '#FAFDFF'}}>{i18n.t('finish')}</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
              <Pressable
                style={{...styles.text, flex:1}}
                onPress={()=>setOpenModal(true)}
              >
                <Text style={styles.text}>{date}</Text>
              </Pressable>
            </View>
            {errors.birthday && touched.birthday && (
              <Text style={loginStyles.errorText}>{errors.birthday}</Text>
            )}

            <Text style={{...styles.label, marginTop: 20, marginBottom: -10}}>{i18n.t('referralCode')}</Text>
            <View style={{
              ...styles.inputContainer,
              backgroundColor: Colors(theme).containerBackgroundColor
            }}>
              <Feather name="users" color={Colors(theme).iconColor} size={25} style={loginStyles.icon} />
              <TextInput
                style={{...styles.text, width: '90%', height:'100%'}}
                placeholder="8404B98D"
                placeholderTextColor={Colors(theme).placeholderTextColor}
                onChangeText={handleChange('referralCode')}
                onBlur={handleBlur('referralCode')}
                value={values.referralCode}
              />
            </View>
            {errors.referralCode && touched.referralCode && (
              <Text style={loginStyles.errorText}>{errors.referralCode}</Text>
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
              <Text style={{...styles.subtitle, color: '#FAFDFF'}}>{i18n.t('register')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.text}>
                {i18n.t('haveAccount')} <Text style={loginStyles.loginLink}>{i18n.t('logIn')}</Text>
              </Text>
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