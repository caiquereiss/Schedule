import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{ // Faz com que seja configurado algumas opções para a tela
      headerShown: false, // Tirar o Header da pagina
      cardStyle: { backgroundColor: '#312e38' }, // o estilo que vamos aplicar nas rotas.
    }}

  >
    <App.Screen name="Dashboard" component={Dashboard} />

  </App.Navigator>
);

export default AppRoutes;
