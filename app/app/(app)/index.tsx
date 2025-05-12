import { View, Text } from 'react-native';
import { useSession } from '@/context/AuthContext';

export default function AppLayout() {
    const {user} = useSession();
  return (
    <View>
        <Text>Wellcome { user?.name }</Text>
    </View>
  );
}
