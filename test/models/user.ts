import { ReduxModel } from '../../src';

enum Gender {
  male,
  female,
}

interface State {
  username: string;
  password: string;
  age: number;
  gender: Gender;
}

export class UserModel extends ReduxModel<State> {
  public state = {
    username: '',
    password: '',
    age: 10,
    gender: Gender.male,
  };

  public changeUsername(newUsername: string) {
    this.setState({
      username: newUsername,
    });
  }
}
