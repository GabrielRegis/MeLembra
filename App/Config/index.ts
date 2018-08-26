import { Text } from 'react-native';
import AppConfig from './AppConfig';
import DebugConfig from './DebugConfig';

if (!Text.defaultProps) {
    Text.defaultProps = {};
}
Text.defaultProps.allowFontScaling = AppConfig.allowTextFontScaling;

if (__DEV__) {
    console.disableYellowBox = !DebugConfig.yellowBox;
}
