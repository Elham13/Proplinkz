import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import COLORS from '../../consts/colors';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {Toast} from 'react-native-ui-lib';
import {registerUserAction} from '../../redux/actions/userActions';

const Register = ({route, navigation}) => {
  const dispatch = useDispatch();
  const register = useSelector(state => state.register);

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [validation, setValidation] = useState({
    name: true,
    mobile: true,
    email: true,
    password: true,
    password1: true,
  });
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    password1: '',
  });
  const [popup, setPopup] = useState({
    open: false,
    color: '',
    message: '',
  });

  const handleName = txt => {
    setFormData({
      ...formData,
      name: txt,
    });
    setValidation({
      ...validation,
      name: true,
    });
  };

  const handleMobile = txt => {
    const mobilRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!mobilRegex.test(txt.trim())) {
      setValidation({...validation, mobile: false});
      setFormData({...formData, mobile: txt});
    } else {
      setValidation({...validation, mobile: true});
      setFormData({...formData, mobile: txt});
    }
  };

  const handleEmail = txt => {
    const emailRegex =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!emailRegex.test(txt.trim())) {
      setValidation({...validation, email: false});
      setFormData({...formData, email: txt});
    } else {
      setValidation({...validation, email: true});
      setFormData({...formData, email: txt});
    }
  };

  const handlePassword = txt => {
    if (txt.trim().length < 6) {
      setValidation({...validation, password: false});
      setFormData({...formData, password: txt});
      return;
    }
    setValidation({...validation, password: true});
    setFormData({...formData, password: txt});
  };

  const handlePassword1 = txt => {
    if (txt.trim() !== formData.password) {
      setValidation({...validation, password1: false});
      setFormData({...formData, password1: txt});
      return;
    }
    setValidation({...validation, password1: true});
    setFormData({...formData, password1: txt});
  };

  const closePopup = () => {
    setPopup({
      open: false,
      color: '',
      message: '',
    });
  };

  const handleSubmit = () => {
    const {name, mobile, email, password, password1} = formData;
    if (
      name === '' ||
      mobile === '' ||
      email === '' ||
      password === '' ||
      password1 === ''
    ) {
      setPopup({
        open: true,
        color: COLORS.warning,
        message: 'Make sure none of the bellow fields are empty',
      });
      return;
    }
    if (
      !validation.name ||
      !validation.email ||
      !validation.password ||
      !validation.password1
    ) {
      setPopup({
        open: true,
        color: COLORS.warning,
        message: 'Make sure you have entered valid data in the inputs',
      });
      return;
    }

    dispatch(
      registerUserAction({
        name,
        mobile,
        email,
        password,
      }),
    );
  };

  useEffect(() => {
    if (register.err) {
      setPopup({
        open: true,
        color: COLORS.error,
        message: register.err,
      });
    }
    if (register.res) {
      setFormData({
        name: '',
        mobile: '',
        email: '',
        password: '',
        password1: '',
      });
      navigation.navigate('Login');
    }
  }, [register]);

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
        <Text style={styles.text_header}>Register</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.action}>
            <FontAwesome name="user-o" size={16} />
            <TextInput
              placeholder="Your name"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={handleName}
              value={formData.name}
            />
            {validation.name && (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color={COLORS.accent} size={16} />
              </Animatable.View>
            )}
          </View>

          <View style={styles.action}>
            <Feather name="phone" size={16} />
            <TextInput
              placeholder="Your Mobile number"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              keyboardType="phone-pad"
              onChangeText={handleMobile}
              value={formData.mobile}
            />
            {validation.mobile && (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color={COLORS.accent} size={16} />
              </Animatable.View>
            )}
          </View>
          {!validation.mobile && (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Please enter a valid Mobile no.
              </Text>
            </Animatable.View>
          )}

          <View style={styles.action}>
            <FontAwesome name="envelope-o" size={16} />
            <TextInput
              placeholder="Your Email"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={handleEmail}
              value={formData.email}
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
              secureTextEntry={passwordVisible}
              autoCapitalize="none"
              onChangeText={handlePassword}
              value={formData.password}
            />
            {passwordVisible ? (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setPasswordVisible(false)}>
                <Feather name="eye" color={COLORS.accent} size={16} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setPasswordVisible(true)}>
                <Feather name="eye-off" color={COLORS.accent} size={16} />
              </TouchableOpacity>
            )}
          </View>
          {!validation.password && (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password should have at least 6 characters.
              </Text>
            </Animatable.View>
          )}

          <View style={styles.action}>
            <Feather name="lock" size={16} />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#666666"
              style={styles.textInput}
              secureTextEntry={passwordVisible}
              autoCapitalize="none"
              onChangeText={handlePassword1}
              value={formData.password1}
            />
          </View>
          {!validation.password1 && (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Passwords do not match.</Text>
            </Animatable.View>
          )}

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              activeOpacity={0.6}
              onPress={handleSubmit}>
              <LinearGradient
                colors={[COLORS.accent, '#48caf3']}
                style={styles.signIn}>
                {register.loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={[styles.textSign, {color: '#fff'}]}>
                    Register
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate('Login')}
              style={[
                styles.signIn,
                {
                  borderColor: COLORS.accent,
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text style={[styles.textSign, {color: COLORS.accent}]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default Register;

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
