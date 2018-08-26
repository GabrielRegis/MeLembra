import * as React from 'react';
import { Text, TouchableOpacity, ViewStyle, ImageRequireSource, Image } from 'react-native';
import styles from './LoadingButtonStyles';

// Note that this file (App/Components/DrawerButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */

interface Props {
    onPress: () => void;
    text: string;

    style?: ViewStyle;
    disabled?: boolean;
    icon?: ImageRequireSource;
}

// tslint:disable-next-line:no-empty 
const LoadingButton: React.SFC<Props> = ({ text, onPress = () => {}, style, disabled, icon }: Props) => (
    <TouchableOpacity style={style ? style : styles.button} onPress={onPress} disabled={disabled ? disabled : false}>
        <Text style={styles.text}>{text} {icon && <Image style={styles.arrowIcon} source={icon} /> }</Text>
        
    </TouchableOpacity>
);

export default LoadingButton;
