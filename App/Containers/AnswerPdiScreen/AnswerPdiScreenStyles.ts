import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Fonts } from '../../Themes/index';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        alignItems: 'flex-start'
    },
    formContainer: {
        ...ApplicationStyles.screen.formContainer,
        marginTop: 34,
        backgroundColor: Colors.white
    },
    inputContainer: {
        paddingBottom: 27
    },
    buttonContainer: {
        marginTop: 30,
        marginBottom: 25,
        paddingHorizontal: 50
    },
    legthText: {
        marginTop: 10,
        alignSelf: 'flex-end',
        fontFamily: Fonts.type.arial,
        fontSize: Fonts.size.small,
        color: Colors.warm_grey
    },
    datePickerContainerStyle: {
        height: 65
    }
});
