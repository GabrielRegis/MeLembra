import * as React from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';

import { Images } from '../../Themes';

import styles from './LaunchScreenStyles';
import { LoginActions } from '../../Store/login/actions';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../../Store/state';
import { info } from '../../Util/log';
import { ImmutableLoginState } from '../../Store/login/state';

export namespace Launch {
    export interface Props {
        actions: LoginActions;
        login: ImmutableLoginState;
    }

    export interface State {
        login: ImmutableLoginState;
    }
}

export class LaunchScreen extends React.Component<Launch.Props, Launch.State> {
    constructor(props: Launch.Props, context?: any) {
        super(props, context);
        info('launch launched');
    }

    handleLogin = () => {
        this.props.actions.login({
            username: 'asdsadasdas',
            password: 'admin'
        });
    };

    public render() {
        return (
            <View style={styles.mainContainer}>
                <Image source={Images.background} resizeMode="stretch" />
                <ScrollView style={styles.container}>
                    <View style={styles.centered}>
                        <Image source={Images.launch} style={styles.logo} />
                    </View>

                    <View>
                        <Text>{(this.props.login && this.props.login.status) || 'undefined status'}</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={[styles.container]} onPress={this.handleLogin}>
                            <Text>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state: RootState): Pick<Launch.Props, 'login'> => ({
    login: state.login
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>): Pick<Launch.Props, 'actions'> => {
    return {
        actions: bindActionCreators(LoginActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen);
