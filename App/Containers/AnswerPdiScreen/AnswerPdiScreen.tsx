import * as React from 'react';
import { Text, View, TouchableOpacity, DatePickerAndroid, Platform } from 'react-native';
import I18n from '../../I18n/I18n';
import styles from './AnswerPdiScreenStyles';
import { AnswerPdiActions } from '../../Store/answerPdi/actions';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../../Store/state';
import { debug } from '../../Util/log';
import * as Immutable from 'seamless-immutable';
import LoadingButton from '../../Components/LoadingButton';
import FloatingLabelInput from '../../Components/FloatingLabelInput/FloatingLabelInput';
import { AnswerPdiState, ImmutableAnswerPdiState } from '../../Store/answerPdi/state';
import ValidationForms from '../../Util/ValidationForms';
import { NavigationScreenProp } from 'react-navigation';
import { HttpRequestStatus } from '../../Model/HttpRequestStatus';
import { DatePickerIOSModal } from '../../Components/DatePickerIOSModal/DatePickerIOSModal';
import moment from 'moment';
import { SyncActions } from '../../Store/sync';

export namespace AnswerPdi {
    export interface Props {
        actions: AnswerPdiActions;
        answerPdi: ImmutableAnswerPdiState;
        navigation: NavigationScreenProp<any, any>;
        sync: SyncActions;
    }

    export interface State {
        answerPdi: ImmutableAnswerPdiState;
        validation: AnswerPdiValidation;
        datePickerIsVisible: boolean;
    }
}

interface AnswerPdiValidation {
    chassiNumberIsValid?: boolean;
    mileageIsValid?: boolean;
    pdiDateIsValid?: boolean;
}

export class AnswerPdiScreen extends React.Component<AnswerPdi.Props, AnswerPdi.State> {
    constructor(props: AnswerPdi.Props, context?: any) {
        super(props, context);
        this.state = {
            answerPdi: Immutable.from<AnswerPdiState>({
                chassiNumber: undefined,
                mileage: '',
                pdiDate: moment().toDate(),
                executedBy: 'Admin', // Pegar dinamicamente do usuário logado,
                observation: ''
            }),
            validation: {
                chassiNumberIsValid: undefined,
                mileageIsValid: undefined,
                pdiDateIsValid: undefined
            },
            datePickerIsVisible: false
        };
    }

    componentDidMount()  {
        this.props.sync.start();
    }
    private handleLogin = () => {
        debug(this.props);
        this.fieldsValidation();
    };

    private handleChassiInput = (text: string) => {
        if (!isNaN(+text)) {
            this.setState({
                answerPdi: this.state.answerPdi.merge({
                    chassiNumber: Number(text)
                })
            });
        }
    };

    private handleDatePickerPressed = () => {
        if (Platform.OS === 'ios') {
            this.setState({ datePickerIsVisible: true });
        } else {
            this.openAndroidDatePicker();
        }
    };

    async openAndroidDatePicker() {
        const { action, year, month, day }: any = await DatePickerAndroid.open({
            date: this.state.answerPdi.pdiDate!
        });

        if (action === 'dateSetAction') {
            const selectedDate = new Date(year, month, day);
            this.setState({
                answerPdi: this.state.answerPdi.merge({
                    pdiDate: selectedDate
                })
            });
            return;
        }
        return;
    }

    private handleModalConfirmPressed = (date: Date) => {
        this.setState({
            answerPdi: this.state.answerPdi.merge({
                pdiDate: date
            }),
            datePickerIsVisible: false
        });
    };

    private handleModalCancelPressed = () => {
        this.setState({
            datePickerIsVisible: false
        });
    };

    private fieldsValidation = (): boolean => {
        const resultPdiDateValidation: boolean = moment(this.state.answerPdi.pdiDate!).isSameOrAfter(moment(), 'day');
        const resultMileageValidation: boolean = ValidationForms.validateString(this.state.answerPdi.mileage ? this.state.answerPdi.mileage : '');
        const resultChassiValidation: boolean = ValidationForms.validateString(
            this.state.answerPdi.chassiNumber ? String(this.state.answerPdi.chassiNumber) : ''
        );

        this.setState({
            validation: {
                chassiNumberIsValid: resultChassiValidation,
                pdiDateIsValid: resultPdiDateValidation,
                mileageIsValid: resultMileageValidation
            }
        });
        return resultPdiDateValidation && resultChassiValidation && resultMileageValidation;
    };

    public render() {
        return (
            <View style={styles.mainContainer}>
                <DatePickerIOSModal
                    date={this.state.answerPdi.pdiDate!}
                    modalIsVisible={this.state.datePickerIsVisible}
                    eventConfirm={(date) => this.handleModalConfirmPressed(date)}
                    eventCancel={() => this.handleModalCancelPressed()}
                />
                <View style={styles.formContainer}>
                    <View>
                        <View style={styles.inputContainer}>
                            <FloatingLabelInput
                                isFieldCorrect={this.state.validation.chassiNumberIsValid}
                                value={this.state.answerPdi.chassiNumber ? String(this.state.answerPdi.chassiNumber) : ''}
                                label={I18n.t(['answerPdiScreen', 'insertChassiNumber'])}
                                keyboardType={'numeric'}
                                onChangeText={(text) => this.handleChassiInput(text)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <FloatingLabelInput
                                isFieldCorrect={this.state.validation.mileageIsValid}
                                value={this.state.answerPdi.mileage!}
                                label={I18n.t(['answerPdiScreen', 'insertMileage'])}
                                keyboardType={'default'}
                                onChangeText={(text) =>
                                    this.setState({
                                        answerPdi: this.state.answerPdi.merge({
                                            mileage: text
                                        })
                                    })
                                }
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity style={styles.datePickerContainerStyle} onPress={this.handleDatePickerPressed}>
                                <View pointerEvents="none">
                                    <FloatingLabelInput
                                        isFieldCorrect={this.state.validation.pdiDateIsValid}
                                        value={moment(this.state.answerPdi.pdiDate!).format('DD/MM/YY')}
                                        isFieldEditable={false}
                                        label={I18n.t(['answerPdiScreen', 'pdiDate'])}
                                        isFocused={true}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <FloatingLabelInput
                                isFieldCorrect={true}
                                isFocused={true}
                                isFieldEditable={false}
                                value={this.state.answerPdi.executedBy!}
                                label={I18n.t(['answerPdiScreen', 'executedBy'])}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <FloatingLabelInput
                                value={this.state.answerPdi.observation!}
                                label={I18n.t(['answerPdiScreen', 'insertObservation'])}
                                keyboardType={'default'}
                                maxLength={100}
                                onChangeText={(text) =>
                                    this.setState({
                                        answerPdi: this.state.answerPdi.merge({
                                            observation: text
                                        })
                                    })
                                }
                            />
                            <Text style={styles.legthText}>{this.state.answerPdi.observation!.length + ' / 100'}</Text>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <LoadingButton
                            onPress={this.handleLogin}
                            text={I18n.t(['answerPdiScreen', 'next'])}
                            icon={require('../../Images/Icons/icon-arrow.png')}
                            disabled={this.props.answerPdi.status === HttpRequestStatus.ONGOING}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: RootState): Pick<AnswerPdi.Props, 'answerPdi'> => ({
    answerPdi: state.answerPdi
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>): Pick<AnswerPdi.Props, 'actions' | 'sync'> => {
    return {
        actions: bindActionCreators(AnswerPdiActions, dispatch),
        sync: bindActionCreators(SyncActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerPdiScreen);
