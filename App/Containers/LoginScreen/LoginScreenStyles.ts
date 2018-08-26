import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/index';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        alignItems: 'flex-end',
        width: '100%'
    },
    inputContainer: {
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 30,
        marginBottom: 45,
        paddingHorizontal: 40,
    },
    linkStyle: {
        paddingRight: Metrics.baseMargin,
        alignSelf: 'flex-end',
        marginVertical: 20,
        fontSize: Fonts.size.specific.link,
        fontWeight: '600',
        color: Colors.link,
        backgroundColor: 'transparent'
    }
});
