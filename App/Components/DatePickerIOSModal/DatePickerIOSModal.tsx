import React from 'react';
import { DatePickerIOS, Modal, View, TouchableOpacity, Text } from 'react-native';
import styles from './DatePickerIOSModalStyles';
import I18n from '../../I18n/I18n';
import moment from 'moment';

export interface Props {
    mode?: 'date' | 'time';
    modalIsVisible: boolean;
    date?: Date;
    eventCancel: () => void;
    eventConfirm: (date: Date) => void;
}

export interface State {
    mode: 'date' | 'time';
    date: Date;
}

export class DatePickerIOSModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            mode: this.props.mode ? this.props.mode : 'date',
            date: this.props.date ? this.props.date : new Date()
        };
    }

    render() {
        return (
            <View>
                <Modal animationType="fade" transparent={true} onRequestClose={() => null} visible={this.props.modalIsVisible}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalDatePickerContainer}>
                            <DatePickerIOS
                                date={this.state.date}
                                mode={this.state.mode}
                                onDateChange={(date: any) => {
                                    this.setState({ date: moment(date).toDate() });
                                }}
                            />
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.eventCancel();
                                    }}>
                                    <Text style={styles.modalCancelButton}>{I18n.t(['datePickerIOS', 'modalCancel'])}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.eventConfirm(this.state.date)}>
                                    <Text style={styles.modalConfirmButton}>{I18n.t(['datePickerIOS', 'modalConfirm'])}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
export default DatePickerIOSModal;
