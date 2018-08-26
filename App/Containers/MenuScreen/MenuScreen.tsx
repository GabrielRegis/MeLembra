import * as React from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import I18n from '../../I18n/I18n';
import styles from './MenuScreenStyles';
import { MenuActions } from '../../Store/menu/actions';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../../Store/state';
import { debug } from '../../Util/log';
import * as Immutable from 'seamless-immutable';
import { MenuState, ImmutableMenuState } from '../../Store/menu/state';
import { NavigationScreenProp, NavigationActions } from 'react-navigation';
import { HttpRequestStatus } from '../../Model/HttpRequestStatus';
import { NotificationModal } from '../../Components/NotificationModal/NotificationModal';
import { NotificationItem } from '../../Model/NotificationItem';

export namespace Menu {
    export interface Props {
        actions: MenuActions;
        menu: ImmutableMenuState;
        navigation: NavigationScreenProp<any, any>;
    }

    export interface State {
        menu: ImmutableMenuState;
        listDataMenu: ListDataMenu[];
        listPendingView: NotificationItem[];
        modalIsVisible: boolean;
    }
}

interface ListDataMenu {
    key: number;
    description: string;
    haveArrow: boolean;
    event: () => void;
}

export class MenuScreen extends React.Component<Menu.Props, Menu.State> {
    constructor(props: Menu.Props, context?: any) {
        super(props, context);
        this.state = {
            menu: Immutable.from<MenuState>({
                status: HttpRequestStatus.NOOP
            }),
            listDataMenu: [
                { key: 1, description: I18n.t(['menuScreen', 'pdiAnswer']), haveArrow: true, event: this.handleAnswerPdi },
                { key: 2, description: I18n.t(['menuScreen', 'pdiHistory']), haveArrow: true, event: this.handleTest },
                { key: 3, description: I18n.t(['menuScreen', 'sync']), haveArrow: true, event: this.handleTest },
                { key: 4, description: I18n.t(['menuScreen', 'perfil']), haveArrow: true, event: this.handleTest },
                { key: 5, description: I18n.t(['menuScreen', 'exit']), haveArrow: false, event: this.handleLogout }
            ],
            // Mock items
            listPendingView: [
                { key: 1, title: 'CHASSI 000000', subTitle: 'Grupo 2000', buttonEvent: this.handleTest },
                { key: 2, title: 'CHASSI 000000', subTitle: 'Grupo 2000', buttonEvent: this.handleTest },
                { key: 3, title: 'CHASSI 000000', subTitle: 'Grupo 2000', buttonEvent: this.handleTest },
                { key: 4, title: 'CHASSI 000000', subTitle: 'Grupo 2000', buttonEvent: this.handleTest },
                { key: 5, title: 'CHASSI 000000', subTitle: 'Grupo 2000', buttonEvent: this.handleTest },
                { key: 6, title: 'CHASSI 000000', subTitle: 'Grupo 2000', buttonEvent: this.handleTest }
            ],
            modalIsVisible: false
        };
    }

    componentWillReceiveProps(newProps: Menu.Props) {
        if (newProps.menu.status === HttpRequestStatus.SUCCESS) {
            this.props.navigation.dispatch(
                NavigationActions.reset({ index: 0, actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })] })
            );
        }
    }

    private handleTest = () => {
        debug('Teste', this.state);
    };

    private handleCloseModal = () => {
        this.setState({ modalIsVisible: false });
    };

    private handleAnswerPdi = () => {
        this.props.navigation.navigate('AnswerPdiScreen');
    };

    private handleLogout = () => {
        this.props.actions.logout();
    };

    private changeModalStatus = () => {
        this.setState({ modalIsVisible: this.state.modalIsVisible ? false : true });
    };

    public render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <View style={{ zIndex: 5 }}>
                        <NotificationModal
                            listNotificationItem={this.state.listPendingView}
                            modalIsVisible={this.state.modalIsVisible}
                            onBackdropPress={this.handleCloseModal}
                        />
                    </View>
                    <View style={[styles.headerContainer, { zIndex: 2 }]}>
                        <View style={styles.logoContainer}>
                            <Image style={styles.menuIcon} source={require('../../Images/Icons/icon-menu.png')} />
                            <Text style={styles.firstItem}>
                                {I18n.t(['menuScreen', 'preDelivery']) + '\n' + I18n.t(['menuScreen', 'inspection'])}
                            </Text>
                        </View>
                        <View style={{ paddingTop: 15 }}>
                            <TouchableOpacity onPress={this.changeModalStatus}>
                                {this.state.modalIsVisible ? (
                                    <Image style={styles.bellIcon} source={require('../../Images/Icons/icon-bell-open.png')} />
                                ) : (
                                    <Image style={styles.bellIcon} source={require('../../Images/Icons/icon-bell.png')} />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                        data={this.state.listDataMenu}
                        keyExtractor={(item) => item.key}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={item.event}>
                                <View style={{ zIndex: 1 }}>
                                    <View style={styles.lineContainer}>
                                        <Text style={styles.itemText}>{item.description}</Text>
                                        {item.haveArrow && <Image style={styles.arrowIcon} source={require('../../Images/Icons/icon-arrow.png')} />}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: RootState): Pick<Menu.Props, 'menu'> => ({
    menu: state.menu
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>): Pick<Menu.Props, 'actions'> => {
    return {
        actions: bindActionCreators(MenuActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
