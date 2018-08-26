import { StackNavigator } from 'react-navigation';
import { Colors } from '../Themes/index';
import styles from './Styles/NavigationStyles';
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen/ForgotPasswordScreen';
import LoginScreen from '../Containers/LoginScreen/LoginScreen';
import MenuScreen from '../Containers/MenuScreen/MenuScreen';
import AnswerPdiScreen from '../Containers/AnswerPdiScreen/AnswerPdiScreen';
import I18n from '../I18n/I18n';

// Manifest of possible screens
const PrimaryNav = StackNavigator(
    {
        ForgotPasswordScreen: {
            screen: ForgotPasswordScreen,
            navigationOptions: {
                headerTitle: 'Esqueci a senha',
                headerTitleStyle: styles.title,
                headerStyle: styles.header,
                headerTintColor: Colors.title
            }
        },
        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: {
                header: null,
                headerBackTitle: null
            }
        },
        MenuScreen: {
            screen: MenuScreen,
            navigationOptions: {
                header: null,
                // headerBackTitle: null
            }
        },
        AnswerPdiScreen: {
            screen: AnswerPdiScreen,
            navigationOptions: {
                headerTitle: I18n.t(['answerPdiScreen', 'answerPdi']), 
                // headerLeft: (
                //     <CustomHeader
                //         icon={require('../Images/Icons/icon-dark-menu.png')}
                //         screenToBack={'MenuScreen'}
                //     />
                // ),
                headerTitleStyle: styles.title,
                headerStyle: styles.header,
                headerTintColor: Colors.title
            }
        }
    },
    {
        // Default config for all screens
        headerMode: 'screen',
        initialRouteName: 'LoginScreen'
    }
);

export default PrimaryNav;
