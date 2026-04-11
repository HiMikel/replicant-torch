import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

type Props = {
  onEnter: () => void;
};

export default function IntroScreen({ onEnter }: Props) {
  const logoOp = useRef(new Animated.Value(0)).current;
  const subtitleOp = useRef(new Animated.Value(0)).current;
  const btnOp = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoOp, {
        toValue: 1,
        duration: 1200,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleOp, {
        toValue: 1,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(btnOp, {
        toValue: 1,
        duration: 600,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoWrap, { opacity: logoOp }]}>
        <Image
          source={require('../assets/ReplicantTorchGameLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.Text style={[styles.subtitle, { opacity: subtitleOp }]}>
        Von Neumann Expansion Protocol
      </Animated.Text>

      <Animated.View style={[styles.btnWrap, { opacity: btnOp }]}>
        {Platform.OS === 'web' ? (
          <Pressable style={[styles.btn, { cursor: 'pointer' }]} onPress={onEnter}>
            <Text style={styles.btnText}>INITIALIZE</Text>
          </Pressable>
        ) : (
          <TouchableOpacity style={styles.btn} onPress={onEnter} activeOpacity={0.7}>
            <Text style={styles.btnText}>INITIALIZE</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: width * 0.82,
    height: width * 0.42,
  },
  subtitle: {
    color: '#60a0ff',
    fontSize: 13,
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 56,
    fontFamily: 'Open Sans',
    textTransform: 'uppercase',
  },
  btnWrap: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  btn: {
    borderColor: '#4a90d9',
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 48,
  },
  btnText: {
    color: '#a8d8ff',
    fontSize: 17,
    letterSpacing: 4,
    fontWeight: '600',
    fontFamily: 'Open Sans',
  },
});
