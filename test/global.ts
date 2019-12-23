// enzyme react 支持
import { configure, ReactWrapper, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// enzyme-to-json
import { Json, mountToJson, Options, shallowToJson } from 'enzyme-to-json';
declare module 'enzyme' {
  class CommonWrapper {
    public toJson(): Json;
  }
}

ShallowWrapper.prototype.toJson = function(options?: Options) {
  return shallowToJson(this, options);
};
ReactWrapper.prototype.toJson = function(options?: Options) {
  return mountToJson(this, options);
};
