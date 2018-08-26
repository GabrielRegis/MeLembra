/// <reference types="@types/jest" />
import { shallow } from 'enzyme';
import * as React from 'react';
import 'react-native';
import * as renderer from 'react-test-renderer';
import FloatingLabelInput from './FloatingLabelInput';

test('AlertMessage component renders correctly', () => {
    // tslint:disable-next-line:no-empty
    const tree = renderer.create(<FloatingLabelInput label={'test'} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('onPress', () => {
    let i = 0;
    const onPress = () => i++;
    const wrapperPress = shallow(<FloatingLabelInput label="hi" />);

    expect(wrapperPress.prop('onPress')).toBe(onPress); // uses the right handler
    expect(i).toBe(0);
    wrapperPress.simulate('press');
    expect(i).toBe(1);
});
