import { State, Action, StateContext, NgxsOnInit, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { UsermanagementService } from '../../services/usermanagement.service';

export interface IUser {
  id_user?: number;
  email?: string;
  connected: boolean;
  verified?: boolean;
  inited: boolean;
}

export class Signin {
  static readonly type = '[User] Signin';
  constructor(public data: { email: string, password: string }) { }
}

export class Signup {
  static readonly type = '[User] Signup';
  constructor(public data: { email: string, password: string }) { }
}

export class Logout {
  static readonly type = '[User] Logout';
}

export class ChangePassword {
  static readonly type = '[User] ChangePassword';
  constructor(public data: { old_password: string, new_password: string}) {}
}

export class ChangeEmail {
  static readonly type = '[User] ChangeEmail';
  constructor(public data: { new_email: string}) {}
}

export class LostPassword {
  static readonly type = '[User] LostPassword';
  constructor(public data: { email: string}) {}
}

export class ChangeLostPassword {
  static readonly type = '[User] ChangeLostPassword';
  constructor(public data: { new_password: string, id_user: number, key: string}) {}
}

export class CheckConnection {
  static readonly type = '[User] CheckConnection';
}

export class SendVerificationEmail {
  static readonly type = '[User] SendVerificationEmail';
}

@State<IUser>({
  name: 'user',
  defaults: {
    connected: false,
    inited: false
  }
})
export class UserState implements NgxsOnInit {

  constructor(private userService: UsermanagementService, private store: Store) { }

  ngxsOnInit(ctx: StateContext<IUser>) {
    this.userService.me()
    .then((user: any) => ctx.setState({connected: true, inited: true, ...user}))
    .catch((err) => {
      ctx.setState({connected: false, inited: true});
    });
  }

  @Action(CheckConnection)
  async checkConnection(ctx: StateContext<IUser>) {
    const result: any = await this.userService.me();
    ctx.setState({
      inited: true,
      connected: true,
      ...result
    });
  }

  @Action(SendVerificationEmail)
  async sendVerificationEmail(ctx: StateContext<IUser>) {
    const id_user = ctx.getState().id_user;
    const result: any = await this.userService.sendVerificationEmail({id_user: id_user});
    return;
  }


  @Action(Signin)
  async signinUser(ctx: StateContext<IUser>, action: Signin) {
    const result: any = await this.userService.signin(action.data);
    const state = ctx.getState();
    ctx.setState({
      ...state,
      connected: true,
      ...result
    });
  }

  @Action(Signup)
  async signupUser(ctx: StateContext<IUser>, action: Signup) {
    const result: any = await this.userService.signup(action.data);
    ctx.setState({
      connected: true,
      ...result
    });
  }

  @Action(Logout)
  async logout(ctx: StateContext<IUser>) {
    const result = await this.userService.logout();
    ctx.setState({
      connected: false,
      inited: true
    });
    return this.store.dispatch(new Navigate(['/']));
  }

  @Action(ChangePassword)
  async changePassword(ctx: StateContext<IUser>, action: ChangePassword) {
    const result: any = await this.userService.changePassword(action.data);
    return result;
  }

  @Action(ChangeEmail)
  async changeEmail(ctx: StateContext<IUser>, action: ChangeEmail) {
    const result: any = await this.userService.changeEmail(action.data);
    return result;
  }

  @Action(LostPassword)
  async lostPassword(ctx: StateContext<IUser>, action: LostPassword) {
    const result: any = await this.userService.lostPassword(action.data);
    return result;
  }

  @Action(ChangeLostPassword)
  async changeLostPassword(ctx: StateContext<IUser>, action: ChangeLostPassword) {
    const result: any = await this.userService.changeLostPassword(action.data);
    return result;
  }
}

