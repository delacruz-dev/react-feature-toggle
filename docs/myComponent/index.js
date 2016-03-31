/* eslint react/prop-types: 0 new-cap: 0 */
import MyComponentA from './myComponentA';
import MyComponentB from './myComponentB';
import MyComponentDefault from './myComponentDefault';
import { ToggleComponent } from '../../src';

// This is the place where you activate the toggle for your component.
// Provide a default component as a first component, and a list of arbitrary
// variations. React Feature Toggle will activate the variation using the display
// name of each variation, so be consistent with it.
export default ToggleComponent(MyComponentDefault, MyComponentA, MyComponentB);
