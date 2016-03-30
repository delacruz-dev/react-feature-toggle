/* eslint react/prop-types: 0 new-cap: 0 */
import MyComponentA from './myComponentA';
import MyComponentB from './myComponentB';
import MyComponentDefault from './myComponentDefault';
import { ToggleComponent } from '../../src';

export default ToggleComponent(MyComponentDefault, MyComponentA, MyComponentB);
