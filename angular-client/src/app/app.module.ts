import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer as userReducer } from './stores/user/user.reducer';
import { environment } from '../environments/environment';
import { UserEffects } from './stores/user/user.effects';

import { AppRoutingModule } from './app-routing.module';
import { UiModule } from './modules/ui/ui.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PasswordEditorComponent } from './dialogs/password-editor/password-editor.component';
import { EmailEditorComponent } from './dialogs/email-editor/email-editor.component';
import { LostPasswordComponent } from './dialogs/lost-password/lost-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UiModule,
    AppRoutingModule,

    StoreModule.forRoot({
      authentication: userReducer,
      router: routerReducer
    }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent,
    PasswordEditorComponent,
    EmailEditorComponent,
    LostPasswordComponent,
    ResetPasswordComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [
    PasswordEditorComponent,
    EmailEditorComponent,
    LostPasswordComponent
  ]
})
export class AppModule { }
