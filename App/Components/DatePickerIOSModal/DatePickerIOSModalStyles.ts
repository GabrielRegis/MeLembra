import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes/index';

export default StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        height: '100%',
        width: '100%',
        justifyContent: 'center'
      },
      modalDatePickerContainer: {
        backgroundColor: 'white',
        height: '40%',
        width: '100%'
      },
      modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '20%'
      },
      modalConfirmButton: {
        color: Colors.aquaBlue,
        fontSize: Fonts.size.regular,
        fontWeight: 'bold'
      },
      modalCancelButton: {
        color: Colors.darkBlueGrey,
        fontSize: Fonts.size.regular,
        fontWeight: 'bold'
      },
});
