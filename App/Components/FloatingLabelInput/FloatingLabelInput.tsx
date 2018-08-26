import * as React from 'react';
import { Animated, Image, TextInput, View, ViewStyle, ImageRequireSource } from 'react-native';
import styles from './FloatingLabelInputStyles';
import { TextInputMask } from 'react-native-masked-text';

export interface Props {
    label: string;
    value?: string;
    onChangeText?: (text: string) => void;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    maxLength?: number;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    isFieldCorrect?: boolean;
    icon?: ImageRequireSource;
    viewStyle?: ViewStyle;
    iconStyle?: ViewStyle;
    secureTextEntry?: boolean;
    mask?: string;
    isFieldEditable?: boolean;
    labelBlurStyle?: ViewStyle;
    labelFocusedStyle?: ViewStyle;
    inputStyle?: ViewStyle;
    isFocused?: boolean;
}

export interface State {
    isFocused: boolean;
    value: any;
}

export default class FloatingLabelInput extends React.Component<Props, State> {
    animatedIsFocused: Animated.Value | any;

    constructor(props: Props) {
        super(props);

        this.state = {
            isFocused: this.props.isFocused ? true : false,
            value: props.value
        };
    }

    componentWillMount() {
        this.animatedIsFocused = new Animated.Value(0);
    }

    componentDidUpdate() {
        Animated.timing(this.animatedIsFocused, {
            toValue: this.state.isFocused ? 1 : 0,
            duration: 200
        }).start();
    }

    handleFocus = () => {
        this.setState({ isFocused: true });
    };

    handleBlur = () => {
        const isEmpty = this.props.value === undefined || this.props.value === null || this.props.value === '';
        this.setState({ isFocused: !isEmpty });
    };

    mapUnderlineStyle: any = () => {
        if (!this.props.isFieldCorrect && this.props.isFieldCorrect !== undefined) {
            return [styles.underlineStyle, styles.underlineStyleError];
        } else if (this.props.isFieldCorrect && this.props.isFieldCorrect !== undefined) {
            return [styles.underlineStyle, styles.underlineStyleCorrect];
        }

        if (this.state.isFocused || this.props.value) {
            return [styles.underlineStyle, styles.underlineStyleFocused];
        } else {
            return styles.underlineStyle;
        }
    };

    mapTextStyle: any = () => {
        if (this.props.icon) {
            return this.state.isFocused
                ? [styles.labelStyleFocused, this.props.labelFocusedStyle]
                : [styles.labelStyleBlur, this.props.labelBlurStyle];
        } else {
            return this.state.isFocused
                ? [styles.labelStyleFocused, this.props.labelFocusedStyle, styles.labelStyleWithoutMarginLeft]
                : [styles.labelStyleBlur, this.props.labelBlurStyle, styles.labelStyleWithoutMarginLeft];
        }
    };

    mapInputStyle: any = () => {
        if (this.props.icon) {
            return [styles.inputStyle, this.props.inputStyle];
        } else {
            return [styles.inputStyle, styles.inputStyleWithoutPaddingLeft];
        }
    };

    public render() {
        const { label, icon, mask, isFieldEditable, autoCapitalize, ...props } = this.props;
        return (
            <View style={[styles.floatingLabelStyle, this.props.viewStyle]}>
                {icon ? (
                    <Image style={!this.props.iconStyle ? styles.iconStyle : [styles.iconStyle, this.props.iconStyle]} source={icon} />
                ) : (
                    <View />
                )}

                <Animated.Text style={this.mapTextStyle()}>{label}</Animated.Text>

                {mask ? (
                    <TextInputMask
                        {...props}
                        style={this.mapInputStyle()}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
                        maxLength={this.props.maxLength ? this.props.maxLength : 100}
                        type={mask}
                        onChangeText={(text: string) => {
                            this.props.onChangeText!(text);
                        }}
                        autoCorrect={false}
                    />
                ) : (
                    <TextInput
                        {...props}
                        style={this.mapInputStyle()}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
                        underlineColorAndroid={'transparent'}
                        value={this.props.value}
                        editable={isFieldEditable !== undefined ? isFieldEditable : true}
                        maxLength={this.props.maxLength ? this.props.maxLength : 100}
                        onChangeText={(text) => {
                            this.props.onChangeText!(text);
                        }}
                        keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
                        secureTextEntry={this.props.secureTextEntry ? this.props.secureTextEntry : false}
                    />
                )}

                <View style={this.mapUnderlineStyle()} />

                {this.props.isFieldCorrect !== undefined ? (
                    <Image
                        style={styles.inputValidationIcon}
                        source={
                            this.props.isFieldCorrect
                                ? require('../../Images/Icons/ic-floating-label-input-correct.png')
                                : require('../../Images/Icons/ic-floating-label-input-incorrect.png')
                        }
                    />
                ) : (
                    <View />
                )}
            </View>
        );
    }
}
