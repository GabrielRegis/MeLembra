import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes/index';

export default StyleSheet.create({
  labelStyleBlur: {
    fontFamily: Fonts.type.arial,
    position: 'absolute',
    marginLeft: '14%',
    paddingTop: '5%',
    color: Colors.black_38,
    fontSize: Fonts.size.input,
    backgroundColor: 'transparent'
  },

  labelStyleFocused: {
    fontFamily: Fonts.type.arial,
    marginLeft: '14%',
    marginBottom: '15%',
    position: 'absolute',
    color: Colors.black_38,
    fontSize: Fonts.size.medium,
    backgroundColor: 'transparent'
  },

  labelStyleWithoutMarginLeft: {
    marginLeft: '0%'
  },

  inputStyleWithoutPaddingLeft: {
    paddingLeft: '0%'
  },

  iconStyle: {
    position: 'absolute',
    height: 24,
    width: 24,
    resizeMode: 'contain'
  },

  underlineStyle: {
    height: 1,
    marginTop: -10,
    backgroundColor: Colors.warm_grey
  },

  underlineStyleFocused: {
    backgroundColor: Colors.warm_grey
  },

  underlineStyleError: {
    backgroundColor: Colors.waterMelon
  },

  underlineStyleCorrect: {
    backgroundColor: Colors.emerald
  },

  inputStyle: {
    height: 65,
    paddingLeft: '14%',
    paddingRight: '18%',
    color: Colors.black_87,
    fontFamily: Fonts.type.arial,
    fontSize: Fonts.size.default,
    backgroundColor: 'transparent'
  },

  inputValidationIcon: {
    width: 17,
    height: 13,
    position: 'absolute',
    right: 20,
    backgroundColor: 'transparent'
  },

  floatingLabelStyle: {
    justifyContent: 'center'
  }

});
