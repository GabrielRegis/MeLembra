import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Fonts } from '../../Themes/index';

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    inputContainer: {
        marginTop: 80,
        marginBottom: 40
    },
    buttonContainer: {
        marginTop: 30,
        marginBottom: 45,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        paddingTop: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    buttonModalContainer: {
        marginTop: 30,
        marginBottom: 20,
    },
    titleModal: {
        fontSize: Fonts.size.h4,
        color: Colors.title,
        marginBottom: 25,
    },
    subtitleModal: {
        color: Colors.title,
        fontSize: Fonts.size.h6,
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    okButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lochmara,
        height: 48,
        width: 150
    }
});
