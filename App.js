import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <>
      <AppNavigator />
      <Toast /> 
    </>
  );
};

export default App;