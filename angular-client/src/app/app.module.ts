import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { UserState } from './stores/user/user.state';

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

@NgModule({
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
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([UserState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    PasswordEditorComponent,
    EmailEditorComponent,
    LostPasswordComponent
  ]
})
export class AppModule { }
