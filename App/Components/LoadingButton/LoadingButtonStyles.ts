import { StyleSheet } from 'react-native';
import Colors from '../../Themes/Colors';
import Fonts from '../../Themes/Fonts';
import Metrics from '../../Themes/Metrics';
import { ApplicationStyles } from '../../Themes';

export default StyleSheet.create({
    text: {
        fontFamily: Fonts.type.arial,
        color: Colors.white,
        fontSize: 16,
        fontWeight: '800',
        marginVertical: Metrics.baseMargin
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.mid_blue,
        height: 48
    },
    arrowIcon: {
        ...ApplicationStyles.icons.arrowIcon,
        marginLeft: 5,
    }
});
