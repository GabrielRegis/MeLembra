/// <reference types="@types/jest" />
import { shallow } from 'enzyme';
import * as React from 'react';
import 'react-native';
import * as renderer from 'react-test-renderer';
import LoadingButton from './LoadingButton';

test('AlertMessage component renders correctly', () => {
    // tslint:disable-next-line:no-empty
    const tree = renderer.create(<LoadingButton onPress={() => {}} text="hi" />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('onPress', () => {
    let i = 0;
    const onPress = () => i++;
    const wrapperPress = shallow(<LoadingButton onPress={onPress} text="hi" />);

    expect(wrapperPress.prop('onPress')).toBe(onPress); // uses the right handler
    expect(i).toBe(0);
    wrapperPress.simulate('press');
    expect(i).toBe(1);
});
