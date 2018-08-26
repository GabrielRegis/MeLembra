import * as React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import styles from './FullButtonStyles';

// Note that this file (App/Components/FullButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */

interface Props {
    onPress?: () => void;
    style?: ViewStyle;
    text?: string;
}

// tslint:disable-next-line:no-empty
const FullButton: React.SFC<Props> = ({ text, style, onPress = () => {} }: Props) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={styles.buttonText}>{text && text.toUpperCase()}</Text>
    </TouchableOpacity>
);

export default FullButton;
