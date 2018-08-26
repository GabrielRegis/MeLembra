import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/index';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    ...ApplicationStyles.flatList,
    ...ApplicationStyles.icons,
    container: {
        ...ApplicationStyles.screen.container,
        backgroundColor: Colors.charcoal_grey
    },
    formContainer: {
        ...ApplicationStyles.screen.formContainer,
        flex: 2,
        justifyContent: 'flex-start',
        marginHorizontal: 0
    },
    headerContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 33,
        paddingBottom: 11,
        height: Metrics.lineListSize,
        borderBottomWidth: 2,
        borderColor: Colors.cool_grey_two
    },
    logoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Metrics.menuMarginHorizontal
    },
    firstItem: {
        color: Colors.white,
        fontSize: 21,
        fontFamily: Fonts.type.broad,
        fontWeight: '600',
        paddingLeft: 12
    },
    bellIcon: {
        width: 24,
        height: 24,
        marginRight: 46
    }
});
