import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/index';

export default StyleSheet.create({
    menuIcon: {
        ...ApplicationStyles.icons.darkMenuIcon,
    },
    headerContent: {
        flex: 1,
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between'
    }
});
