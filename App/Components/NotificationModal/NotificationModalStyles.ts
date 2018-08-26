import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/index';

export default StyleSheet.create({
    ...ApplicationStyles.flatList,
    lineContainer: {
        borderColor: Colors.white_three,
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        height: Metrics.lineListSize,
        paddingHorizontal: 31,
        borderBottomWidth: 2
    },
    notificationContainer: {
        flex: 1,
        flexDirection: 'column',
        width: 360
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 62,
        height: 31,
        borderRadius: 2,
        backgroundColor: Colors.mid_blue
    },
    circleContainer: {
        flex: 2,
        flexDirection: 'row',
        height: Metrics.lineListSize,
        alignItems: 'center'
    },
    modalContainer: {
        marginTop: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    notificationContent: {
        backgroundColor: Colors.white,
        height: 250
    },
    notificationHeaderTitle: {
        ...ApplicationStyles.screen.titleText
    },
    notificationHeader: {
        backgroundColor: Colors.white_two,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        height: 52,
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16
    },
    notificationFooter: {
        borderColor: Colors.white_three,
        borderTopWidth: 2,
        backgroundColor: Colors.white,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: 52,
        paddingTop: 16,
        paddingBottom: 16
    },
    itemText: {
        ...ApplicationStyles.flatList.itemText,
        fontFamily: Fonts.type.arialMt,
        fontWeight: 'bold',
        color: Colors.black
    },
    itemSubText: {
        ...ApplicationStyles.flatList.itemText,
        fontFamily: Fonts.type.arialMt,
        fontWeight: 'normal',
        color: Colors.black
    },
    buttonText: {
        ... ApplicationStyles.buttons.buttonText,
        fontSize: Fonts.size.small,
        fontWeight: 'bold'
    },
    arrowStyle: {
        alignSelf: 'flex-end',
        marginHorizontal: 35,
        width: 0,
        height: 0,
        borderLeftWidth: 12,
        borderRightWidth: 12,
        borderBottomWidth: 12,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: Colors.white_two
    },
    redCircleIcon: {
        width: 10,
        height: 10,
        marginRight: 15
    },
});
