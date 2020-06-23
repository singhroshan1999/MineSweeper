import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screen/HomeScreen';
import { Provider } from './src/context/MineMatrixContext';
import SettingScreen from './src/screen/SettingScreen';


const navigator = createStackNavigator({
  home: HomeScreen,
  setting: SettingScreen
}, {
  initialRouteKey: "home",
  defaultNavigationOptions: {
    title: "Minesweeper",
  }
});

const App = createAppContainer(navigator);

export default () => {
  return (
      <Provider>
        <App />
      </Provider>
  );
}