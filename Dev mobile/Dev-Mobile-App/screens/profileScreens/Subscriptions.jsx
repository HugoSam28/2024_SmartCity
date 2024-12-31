import {View, Text, ScrollView} from "react-native";
import {useThemeContext} from "../../provider/Theme";
import {Colors, GlobalStyles} from "../../components/styles";
import BackButton from "../../components/buttons/BackButton";
import {SafeAreaView} from "react-native-safe-area-context";
import FetchWithRetry from "../../API/fetchWithRetry";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../provider/AuthContext";
import {useLanguageContext} from "../../provider/LanguageContext";
import Subscription from "../../components/Subscription";

export default function Help({ navigation }) {
  const {theme} = useThemeContext();
  const styles = GlobalStyles(theme);
  const {i18n} = useLanguageContext();
  const {userToken} = useContext(AuthContext);
  const [data, setData] = useState({others:[], own:[]});
  const [error, setError] = useState('');
  const fetchData = async () => {
    try {
      setError('');
      const items = await FetchWithRetry(
        `http://${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/v1/personSubscription/getOwnSubscription`,{
        method: 'GET',
        headers: {
          "authorization": `Bearer ${await userToken()}`,
          "Content-Type": "application/json",
        },
      });
      setData(items);
      console.log(data)
    } catch (e) {
      setError(e.message);
    }
  };
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <ScrollView style={{backgroundColor: Colors(theme).backgroundColor}}>>
      <SafeAreaView style={styles.profileContainer}>
        <BackButton onPress={() => navigation.goBack()} />
        {data?.own[0] ? null : (
          <>
            <Text style={styles.subtitle}>{i18n.t('own')}</Text>
            <ScrollView
              style={{ backgroundColor: Colors(theme).backgroundColor }}
              horizontal
            >
              <Subscription
                id={0}
                label={'Gold'}
                discount={5}
                paymentRecurrence={'monthly'}
                vehicleType={'Voiture'}
              >
                <Text>yolo</Text>
              </Subscription>
              <View style={styles.subContainer}>
                <Text>yolo</Text>
              </View>
              <View style={styles.subContainer}>
                <Text>yolo</Text>
              </View>
              <View style={styles.subContainer}>
                <Text>yolo</Text>
              </View>
              <View style={styles.subContainer}>
                <Text>yolo</Text>
              </View>
              <View style={styles.subContainer}>
                <Text>yolo</Text>
              </View>
              <View style={styles.subContainer}>
                <Text>yolo</Text>
              </View>
              <View style={styles.subContainer}>
                <Text>yolo</Text>
              </View>
              <View style={styles.subContainer}>
                <Text>yolo</Text>
              </View>
              <View style={styles.subContainer}>
                <Text>yolo</Text>
              </View>
            </ScrollView>
          </>
        )}
        {!data?.others[0] ? null : (
          <>

          </>
        )}

          <View>
            <Text style={styles.title}>Pute = Thoams</Text>
            <Text style={styles.subtitle}>Hugo le Supreme leader</Text>
            <Text style={styles.text}>
              Le reste:
              Le corps du texte (et pas du Christ 👀)
            </Text>
          </View>
      </SafeAreaView>
    </ScrollView>

  );
}