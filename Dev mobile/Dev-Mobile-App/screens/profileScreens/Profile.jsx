import {Text, TouchableOpacity, View, ScrollView, Modal, TextInput} from 'react-native';
import React, {useRef} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {SafeAreaView} from "react-native-safe-area-context"; // Utilisation des icônes d'Ionicons
import { GlobalStyles, Colors } from "../../components/styles";
import {useThemeContext} from "../../provider/Theme";
import {useLanguageContext} from "../../provider/LanguageContext";
import {AuthContext} from "../../provider/AuthContext";     
import FetchWithRetry from "../../API/fetchWithRetry";
import { useState } from 'react';
import { useEffect } from 'react';

export default function ProfileMenu({ navigation }) {
  const {i18n} = useLanguageContext();

  const menuItems = [
    { icon: 'person-outline', label: i18n.t('account'), screen: 'Account' },
    { icon: 'list-outline', label: i18n.t('subscriptions'), screen: 'Subscriptions' },
    { icon: 'car-outline', label: i18n.t('history'), screen: 'History' },
    { icon: 'person-add-outline', label: i18n.t('inviteFriends'), screen: 'InviteFriends' },
    { icon: 'settings-outline', label: i18n.t('settings'), screen: 'Settings' },
    { icon: 'help-circle-outline', label: i18n.t('help'), screen: 'Help' },
  ];
  const [openModalWithdraw, setOpenModalWithdraw] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const inputBalanceAdd = useRef();
  const inputBalanceWithdraw = useRef();
  const {theme} = useThemeContext();
  const styles = GlobalStyles(theme);
  const {logOut, userToken} = React.useContext(AuthContext);
  const [datas, setDatas] = useState([]);

  const fetchData = async () => {
    try {
        const items = await FetchWithRetry(`http://${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/v1/person/porfile`,{
            method: 'GET',
            headers: {
                "authorization": `Bearer ${await userToken()}`,
                "Content-Type": "application/json",
            },
        });
        setDatas(items);
    } catch (e) {
        setError(e.message);
    }
  };
  useEffect(() => {
    fetchData()
  }, [])

  const updateBalance = async (value) => {
    if(value){
      try {
        await FetchWithRetry(`http://${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/v1/person/updateBalance`,{
          method: 'PATCH',
          headers: {
              "authorization": `Bearer ${await userToken()}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify({balance:value < 0 && parseFloat(datas.balance) < value * -1 ? datas.balance * -1: value}),
        });
      } catch (e) {
          setError(e.message);
      }
    }
  };

  return(
    <ScrollView style={{backgroundColor: Colors(theme).backgroundColor}}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{datas.first_name}</Text>
        <Text style={styles.title}>{datas.last_name}</Text>
        <View style={{...styles.subContainer, marginTop: 40}}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Ionicons name={item.icon} size={24} color={Colors(theme).text} />
              <Text style={{...styles.text, marginLeft: 10, fontSize: 20 }} >{item.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            key={'logOut'}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => logOut()}
          >
            <Ionicons name={'log-out-outline'} size={24} color={Colors(theme).text} />
            <Text style={{...styles.text, marginLeft: 10, fontSize: 20 }} >{i18n.t('logOut')}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{...styles.subContainer, marginTop: 40}}>
          <Text style={{...styles.subtitle, marginLeft: 10, textAlign:'center'}} >{i18n.t('credit')}</Text>
          <Text style={{...styles.text, marginLeft: 10, fontSize: 20, textAlign:'center', marginBottom: -5, marginTop: -10}} >{datas.balance !== undefined ? datas.balance.toString().replace('.', ',') : null}€</Text>
          <View style={{...styles.flexContainer}}>
            <Modal
              animationType="slide"
              visible={openModalWithdraw}
              transparent={true}
              onRequestClose={() => {
                console.log('Modal has been closed.');
                setOpenModalWithdraw(false);
              }}>
              <View style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:Colors(theme).backGroundOpacityColor
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
                  <Text style={{...styles.subtitle, marginBottom: -10}}>{i18n.t('amount')}</Text>
                  <View style={{
                    ...styles.inputContainer,
                    backgroundColor: Colors(theme).containerInArrayColor
                  }}>
                    <TextInput
                      style={{...styles.text, width: '90%', height:'100%', textAlign:'center'}}
                      placeholder = "10"
                      placeholderTextColor={Colors(theme).placeholderTextColor}
                      keyboardType={'numeric'}
                      ref={inputBalanceWithdraw}
                      onChangeText={text => {
                        if (inputBalanceWithdraw.current) inputBalanceWithdraw.current.value = text;
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      marginTop: 20,
                      borderRadius: 8,
                      padding: 10,
                      elevation: 2,
                      backgroundColor: Colors(theme).accentColor
                    }}
                    onPress={async () => {
                      setOpenModalWithdraw(false)
                      await updateBalance(parseFloat((inputBalanceWithdraw.current.value.includes(',') ? inputBalanceWithdraw.current.value.replace(',', '.') : inputBalanceWithdraw.current.value) * -1))
                      await fetchData()
                    }}
                  >
                    <Text style={{...styles.text, fontSize:18, color: '#FAFDFF'}}>{i18n.t('withdraw')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              visible={openModalAdd}
              transparent={true}
              onRequestClose={() => {
                console.log('Modal has been closed.');
                setOpenModalAdd(false);
              }}>
              <View style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors(theme).backGroundOpacityColor
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
                  <Text style={{...styles.subtitle, marginBottom: -10}}>{i18n.t('amount')}</Text>
                  <View style={{
                    ...styles.inputContainer,
                    backgroundColor: Colors(theme).containerInArrayColor
                  }}>
                    <TextInput
                      style={{...styles.text, width: '90%', height:'100%', textAlign:'center'}}
                      placeholder = "10"
                      placeholderTextColor={Colors(theme).placeholderTextColor}
                      keyboardType={'numeric'}
                      ref={inputBalanceAdd}
                      onChangeText={text => {
                        if (inputBalanceAdd.current) inputBalanceAdd.current.value = text;
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      marginTop: 20,
                      borderRadius: 8,
                      padding: 10,
                      elevation: 2,
                      backgroundColor: Colors(theme).accentColor
                    }}
                    onPress={async () => {
                      setOpenModalAdd(false)
                      await updateBalance(parseFloat(inputBalanceAdd.current.value.includes(',') ? inputBalanceAdd.current.value.replace(',', '.') : inputBalanceAdd.current.value))
                      await fetchData()
                    }}
                  >
                    <Text style={{...styles.text, fontSize:18, color: '#FAFDFF'}}>{i18n.t('add')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
              <TouchableOpacity
                style={{...styles.button, backgroundColor: Colors(theme).containerInArrayColor}}
                onPress={() => setOpenModalWithdraw(true)}>
                <Text style={{...styles.text}}>{i18n.t('withdraw')}</Text>
              </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.button, backgroundColor: Colors(theme).accentColor}}
              onPress={() => setOpenModalAdd(true)}>
              <Text style={{...styles.text, color: '#FAFDFF'}}>{i18n.t('add')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}