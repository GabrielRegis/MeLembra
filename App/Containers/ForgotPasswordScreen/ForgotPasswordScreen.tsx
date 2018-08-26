import * as React from 'react';
import { Text, View } from 'react-native';
import I18n from '../../I18n/I18n';
import styles from './ForgotPasswordScreenStyles';
import { ForgotPasswordActions } from '../../Store/forgotPassword/actions';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../../Store/state';
import * as Immutable from 'seamless-immutable';
import LoadingButton from '../../Components/LoadingButton';
import FloatingLabelInput from '../../Components/FloatingLabelInput/FloatingLabelInput';
import { ForgotPasswordState, ImmutableForgotPasswordState } from '../../Store/forgotPassword/state';
import ValidationForms from '../../Util/ValidationForms';
import Modal from 'react-native-modal';
import { NavigationScreenProp } from 'react-navigation';
import { HttpRequestStatus } from '../../Model/HttpRequestStatus';
import { noop } from 'redux-saga/utils';

export namespace ForgotPassword {
    export interface Props {
        actions: ForgotPasswordActions;
        forgotPassword: ImmutableForgotPasswordState;
        navigation: NavigationScreenProp<any, any>;
    }

    export interface State {
        forgotPassword: ImmutableForgotPasswordState;
        modalIsVisible: boolean;
        emailIsValid?: boolean;
    }
}

export class ForgotPasswordScreen extends React.Component<ForgotPassword.Props, ForgotPassword.State> {
    constructor(props: ForgotPassword.Props, context?: any) {
        super(props, context);
        this.state = {
            forgotPassword: Immutable.from<ForgotPasswordState>({
                email: ''
            }),
            emailIsValid: undefined,
            modalIsVisible: false
        };
    }

    componentWillReceiveProps(newProps: ForgotPassword.Props) {
        if (newProps.forgotPassword.status === HttpRequestStatus.SUCCESS) {
            this.setState({
                modalIsVisible: true
            });
        }
    }

    private handleSend = () => {
        if (!this.fieldsValidation()) {
            return;
        }
        this.props.actions.resetPassword(this.state.forgotPassword.email!);
    };

    private handleOk = () => {
        this.setState({
            modalIsVisible: false
        });
        this.props.navigation.pop(1);
    };

    private fieldsValidation = () => {
        const result: boolean = ValidationForms.validateEmail(this.state.forgotPassword.email ? this.state.forgotPassword.email : '');
        this.setState({
            emailIsValid: result
        });
        return result;
    };

    public render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <FloatingLabelInput
                            isFieldCorrect={this.state.emailIsValid}
                            value={this.state.forgotPassword.email!}
                            label={I18n.t(['forgotPasswordScreen', 'emailHint'])}
                            keyboardType={'email-address'}
                            onChangeText={(text) =>
                                this.setState({
                                    forgotPassword: this.state.forgotPassword.merge({
                                        email: text
                                    })
                                })
                            }
                        />
                        {/* Vereficar com a Ju como vai ficar a apresentação dos erros */}
                        {/* <Text>{I18n.t(['loginScreen', 'Mensagem de erro'])}</Text> */}
                    </View>

                    <View style={styles.buttonContainer}>
                        <LoadingButton onPress={() => this.handleSend()} text={I18n.t(['forgotPasswordScreen', 'btnSend'])} />
                    </View>
                </View>
                <Modal scrollTo={noop} scrollOffset={0} isVisible={this.state.modalIsVisible} style={styles.bottomModal}>
                    <View style={styles.modalContent}>
                        <Text style={styles.titleModal}>Um email foi enviado{'\n'}para sua caixa postal.</Text>
                        <Text style={styles.subtitleModal}>Verifique sua caixa de email</Text>
                        <View style={styles.buttonModalContainer}>
                            <LoadingButton style={styles.okButton} onPress={() => this.handleOk()} text={I18n.t(['forgotPasswordScreen', 'Ok'])} />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = (state: RootState): Pick<ForgotPassword.Props, 'forgotPassword'> => ({
    forgotPassword: state.forgotPassword
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>): Pick<ForgotPassword.Props, 'actions'> => {
    return {
        actions: bindActionCreators(ForgotPasswordActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);
