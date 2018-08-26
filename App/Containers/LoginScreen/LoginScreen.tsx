import * as React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import I18n from '../../I18n/I18n';
import styles from './LoginScreenStyles';
import { LoginActions } from '../../Store/login/actions';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../../Store/state';
import { debug } from '../../Util/log';
import * as Immutable from 'seamless-immutable';
import LoadingButton from '../../Components/LoadingButton';
import FloatingLabelInput from '../../Components/FloatingLabelInput/FloatingLabelInput';
import { LoginState, ImmutableLoginState } from '../../Store/login/state';
import ValidationForms from '../../Util/ValidationForms';
import { NavigationScreenProp } from 'react-navigation';
import { HttpRequestStatus } from '../../Model/HttpRequestStatus';

export namespace Login {
    export interface Props {
        actions: LoginActions;
        login: ImmutableLoginState;
        navigation: NavigationScreenProp<any, any>;
    }

    export interface State {
        login: ImmutableLoginState;
        validation: LoginValidation;
    }
}

interface LoginValidation {
    usernameIsValid?: boolean;
    passwordIsValid?: boolean;
}

export class LoginScreen extends React.Component<Login.Props, Login.State> {
    constructor(props: Login.Props, context?: any) {
        super(props, context);
        this.state = {
            login: Immutable.from<LoginState>({
                username: '',
                password: '',
                status: HttpRequestStatus.NOOP
            }),
            validation: {
                usernameIsValid: undefined,
                passwordIsValid: undefined
            }
        };
    }

    componentWillReceiveProps(newProps: Login.Props) {
        if (newProps.login.status === HttpRequestStatus.SUCCESS) {
            this.props.navigation.navigate('MenuScreen');
        }
    }

    private handleLogin = () => {
        if (!this.fieldsValidation()) {
            return;
        }
        debug(this.props);
        this.props.actions.login({
            username: this.state.login.username,
            password: this.state.login.password
        });
    };

    private handleForgetPassword = () => {
        this.props.navigation.navigate('ForgotPasswordScreen');
    };

    private fieldsValidation = () => {
        const resultEmailValidation: boolean = ValidationForms.validateEmail(this.state.login.username ? this.state.login.username : '');
        const resultPasswordValidation: boolean = ValidationForms.validatePassword(this.state.login.password ? this.state.login.password : '');
        this.setState({
            validation: {
                usernameIsValid: resultEmailValidation,
                passwordIsValid: resultPasswordValidation
            }
        });
        return resultEmailValidation && resultPasswordValidation;
    };

    public render() {
        return (
            <View >
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <FloatingLabelInput
                            isFieldCorrect={this.state.validation.usernameIsValid}
                            value={this.state.login.username ? this.state.login.username : ''}
                            label={I18n.t(['loginScreen', 'emailHint'])}
                            keyboardType={'email-address'}
                            autoCapitalize={'none'}
                            onChangeText={(text) =>
                                this.setState({
                                    login: this.state.login.merge({
                                        username: text
                                    })
                                })
                            }
                        />
                        {/* Vereficar com a Ju como vai ficar a apresentação dos erros */}
                        {/* <Text>{I18n.t(['loginScreen', 'Mensagem de erro'])}</Text> */}
                    </View>
                    <View style={styles.inputContainer}>
                        <FloatingLabelInput
                            isFieldCorrect={this.state.validation!.passwordIsValid}
                            value={this.state.login.password ? this.state.login.password : ''}
                            label={I18n.t(['loginScreen', 'passwordHint'])}
                            keyboardType={'default'}
                            secureTextEntry={true}
                            onChangeText={(text) =>
                                this.setState({
                                    login: this.state.login.merge({
                                        password: text
                                    })
                                })
                            }
                        />
                        {/* Vereficar com a Ju como vai ficar a apresentação dos erros */}
                        {/* <Text>{I18n.t(['loginScreen', 'Mensagem de erro'])}</Text> */}
                        <Text style={styles.linkStyle} onPress={() => this.handleForgetPassword()}>
                            {I18n.t(['loginScreen', 'forgotPassword'])}
                        </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <LoadingButton
                            onPress={this.handleLogin}
                            text={I18n.t(['loginScreen', 'btnLogin'])}
                            disabled={this.props.login.status === HttpRequestStatus.ONGOING}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: RootState): Pick<Login.Props, 'login'> => ({
    login: state.login
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>): Pick<Login.Props, 'actions'> => {
    return {
        actions: bindActionCreators(LoginActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
