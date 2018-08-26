import { TextStyle, ViewStyle } from 'react-native';

import Colors from './Colors';
import Fonts from './Fonts';
import Metrics from './Metrics';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
    screen: {
        mainContainer: {
            flex: 1,
            backgroundColor: Colors.white
        } as ViewStyle,
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: Colors.white
        } as ViewStyle,
        formContainer: {
            marginHorizontal: Metrics.doubleBaseMargin,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around'
        } as ViewStyle,
        titleScreenText: {
            fontFamily: 'Arial',
            fontSize: 18,
            lineHeight: 28,
            color: Colors.greyish_brown_87
        } as TextStyle,
        titleText: {
            color: Colors.black,
            fontSize: 14,
            fontFamily: Fonts.type.arial,
            fontWeight: 'bold',
            fontStyle: 'normal',
            letterSpacing: 0,
            textAlign: 'left'
        } as TextStyle
    },
    flatList: {
        lineContainer: {
            flex: 2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: Metrics.lineListSize,
            paddingHorizontal: 31,
            borderBottomWidth: 2,
            borderColor: Colors.cool_grey_two
        } as TextStyle,
        itemText: {
            fontFamily: Fonts.type.roboto,
            fontSize: Fonts.size.medium,
            fontWeight: '500',
            letterSpacing: 0,
            textAlign: 'left',
            color: Colors.white
        } as TextStyle
    },
    buttons: {
        buttonText: {
            color: Colors.white,
            fontSize: Fonts.size.medium,
            fontWeight: 'normal',
            fontFamily: 'Arial',
            letterSpacing: 0,
            textAlign: 'left'
        } as TextStyle
    },
    icons: {
        menuIcon: {
            width: 18,
            height: 12
        } as TextStyle,
        darkMenuIcon: {
            width: 24,
            height: 24
        } as TextStyle,
        arrowIcon: {
            width: 7,
            height: 11.5
        } as TextStyle
    }
};

export default ApplicationStyles;
