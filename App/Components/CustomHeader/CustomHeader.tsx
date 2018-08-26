import React from 'react';
import { View, ImageRequireSource, Image, TouchableOpacity } from 'react-native';
import styles from './CustomHeaderStyles';
import { NavigationScreenProp } from 'react-navigation';

export interface Props {
    title?: string;
    icon: ImageRequireSource;
    screenToBack: string;
}

export interface State {
    navigation: NavigationScreenProp<any,any>
    isVisible: boolean;
}

export class CustomHeader extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.headerContent}>
                <TouchableOpacity onPress={() => this.state.navigation.navigate(this.props.screenToBack)}>
                    <Image style={styles.menuIcon} source={this.props.icon} />
                </TouchableOpacity>
            </View>
        );
    }
}
export default CustomHeader;
