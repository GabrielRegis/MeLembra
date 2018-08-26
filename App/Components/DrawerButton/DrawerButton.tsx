import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './DrawerButtonStyles';

// Note that this file (App/Components/DrawerButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */


interface Props {
    onPress: () => void;
    text: string;
}

// tslint:disable-next-line:no-empty
const DrawerButton: React.SFC<Props> = ({ text, onPress = () => {} }: Props) => (
    <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
);

export default DrawerButton;
