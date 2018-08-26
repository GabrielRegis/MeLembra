import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './NotificationModalStyles';
import { NotificationItem } from '../../Model/NotificationItem';
import I18n from '../../I18n/I18n';
import Modal from 'react-native-modal';
import { noop } from 'redux-saga/utils';

export interface Props {
    onBackdropPress: () => void;
    listNotificationItem: NotificationItem[];
    modalIsVisible: boolean;
}

export class NotificationModal extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Modal
                    style={[styles.modalContainer]}
                    scrollTo={noop}
                    scrollOffset={0}
                    isVisible={this.props.modalIsVisible}
                    backdropOpacity={1}
                    onBackdropPress={this.props.onBackdropPress}
                    backdropColor={'transparent'}>
                    <View style={styles.notificationContainer}>
                        <View style={styles.arrowStyle} />

                        {/* Header */}
                        <View style={styles.notificationHeader}>
                            <Text style={styles.notificationHeaderTitle}>
                                {this.props.listNotificationItem.length > 0
                                    ? I18n.t(['notificationComponent', 'hasPending'])
                                    : I18n.t(['notificationComponent', 'noHasPending'])}
                            </Text>
                        </View>

                        {/* Content */}
                        <View style={[styles.notificationContent, { height: this.props.listNotificationItem.length > 0 ? 250 : 0 }]}>
                            <FlatList
                                data={this.props.listNotificationItem}
                                keyExtractor={(item) => item.key}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={item.event}>
                                        <View>
                                            <View style={styles.lineContainer}>
                                                <View style={styles.circleContainer}>
                                                    <Image style={styles.redCircleIcon} source={require('../../Images/red-circle.png')} />
                                                    <View>
                                                        <Text style={styles.itemText}>{item.title}</Text>
                                                        <Text style={styles.itemSubText}>{item.subTitle}</Text>
                                                    </View>
                                                </View>
                                                <TouchableOpacity style={styles.buttonContainer}>
                                                    <Text style={styles.buttonText}>{I18n.t(['notificationComponent', 'editButton'])}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />

                            {/* Footer */}
                            {this.props.listNotificationItem.length > 0 && (
                                <View style={styles.notificationFooter}>
                                    <View style={[styles.circleContainer, { paddingHorizontal: 31 }]}>
                                        <Image style={styles.redCircleIcon} source={require('../../Images/red-circle.png')} />
                                        <Text style={styles.itemSubText}>{I18n.t(['notificationComponent', 'footerText'])}</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
export default NotificationModal;
