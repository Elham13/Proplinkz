import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {Toast} from 'react-native-ui-lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../consts/colors';
import {loginAction} from '../../redux/actions/userActions';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);

  const [hidePassword, setHidePassword] = useState(true);
  const [validation, setValidation] = useState({
    email: true,
    password: true,
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [popup, setPopup] = useState({
    open: false,
    color: '',
    message: '',
  });

  const handleEmail = txt => {
    const emailRegex =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!emailRegex.test(txt.trim())) {
      setValidation({...validation, email: false});
      setFormData({...formData, email: txt});
      return;
    }
    setValidation({...validation, email: true});
    setFormData({...formData, email: txt});
  };

  const handlePassword = txt => {
    if (txt.trim().length < 6) {
      setValidation({...validation, password: false});
      setFormData({...formData, password: txt});
      return;
    }
    setValidation({...validation, password: txt});
    setFormData({...formData, password: txt});
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      setPopup({
        open: true,
        color: COLORS.warning,
        message: 'Make sure none of the inputs are empty',
      });
      return;
    }
    if (!validation.email || !validation.password) {
      setPopup({
        open: true,
        color: COLORS.warning,
        message: 'Make sure all inputs are correctly filled',
      });
      return;
    }

    dispatch(loginAction(formData));
  };

  const closePopup = () => {
    setPopup({
      open: false,
      color: '',
      message: '',
    });
  };

  useEffect(() => {
    if (login.err) {
      setPopup({
        open: true,
        color: COLORS.error,
        message: login.err,
      });
      return;
    }
    if (Object.keys(login.res).length) {
      setFormData({
        email: '',
        password: '',
      });
      navigation.navigate('SelerScreen');
      return;
    }
  }, [login]);

  return (
    <View style={styles.container}>
      <Toast
        visible={popup.open}
        position={'top'}
        backgroundColor={popup.color}
        message={popup.message}
        onDismiss={closePopup}
        autoDismiss={10000}
        showDismiss={true}
      />
      <View style={styles.header}>
        <Text style={styles.text_header}>PropLinkz</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={16} />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            value={formData.email}
            onChangeText={handleEmail}
          />
          {validation.email && (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color={COLORS.accent} size={16} />
            </Animatable.View>
          )}
        </View>
        {!validation.email && (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Please enter a valid email.</Text>
          </Animatable.View>
        )}

        <View style={styles.action}>
          <Feather name="lock" size={16} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            style={styles.textInput}
            secureTextEntry={hidePassword}
            autoCapitalize="none"
            value={formData.password}
            onChangeText={handlePassword}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setHidePassword(!hidePassword)}>
            {hidePassword ? (
              <Feather name="eye" color={COLORS.accent} size={16} />
            ) : (
              <Feather name="eye-off" color={COLORS.accent} size={16} />
            )}
          </TouchableOpacity>
        </View>
        {!validation.password && (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be at least 6 characters
            </Text>
          </Animatable.View>
        )}

        <TouchableOpacity activeOpacity={0.6}>
          <Text style={{color: COLORS.accent, marginTop: 15}}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            activeOpacity={0.6}
            onPress={handleSubmit}>
            <LinearGradient
              colors={[COLORS.accent, '#48caf3']}
              style={styles.signIn}>
              {login.loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={[styles.textSign, {color: '#fff'}]}>Login</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('Register')}
            style={[
              styles.signIn,
              {
                borderColor: COLORS.accent,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text style={[styles.textSign, {color: COLORS.accent}]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.accent,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 14,
  },
  action: {
    flexDirection: 'row',
    marginTop: 28,
    borderBottomColor: COLORS.accent,
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 30,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.error,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    padding: 0,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 14,
  },
  errorMsg: {
    color: COLORS.error,
    fontSize: 12,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
