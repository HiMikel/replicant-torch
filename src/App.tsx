import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  useFonts,
} from '@expo-google-fonts/open-sans';
import OrbitScreen from './screens/OrbitScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Open Sans': OpenSans_400Regular,
    'Open Sans SemiBold': OpenSans_600SemiBold,
    'Open Sans Bold': OpenSans_700Bold,
  });

  if (!fontsLoaded) return null;

  return <OrbitScreen />;
}
