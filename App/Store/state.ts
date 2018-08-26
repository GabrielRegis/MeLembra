import { NavigationState } from './navigation';
import { ImmutableAnswerPdiState } from './answerPdi/state';
import { ImmutableForgotPasswordState } from './forgotPassword/state';
import { ImmutableLoginState } from './login/state';
import { ImmutableMenuState } from './menu/state';

export interface RootState {
    login: ImmutableLoginState;
    forgotPassword: ImmutableForgotPasswordState;
    answerPdi: ImmutableAnswerPdiState;
    menu: ImmutableMenuState;
    nav: NavigationState;
}