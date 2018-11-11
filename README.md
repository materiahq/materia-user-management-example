# Materia Designer example: User Management Application

An example application made with [Materia Designer](https://getmateria.com), that demonstrate the use of the official addons:
- [@materia/users](https://github.com/materiahq/materia-users): user management addon, used to authenticate users,
- [@materia/mailjet](https://github.com/materiahq/materia-mailjet): an emailing addon using Mailjet, used by the user-management addon to send emails (email verification, lost password etc...).

The front end part is made with angular (v6+) framework, that uses the REST API exposed by our Materia application backend.

**Usage**

Clone this repository in your working directory:
`git clone https://github.com/materiahq/materia-user-management-example.git`

Install dependencies:
`npm install` or `yarn`

Install angular application dependencies (should be automatically done after root dependencies install):
`cd angular-client && npm install` or `cd angular-client && yarn`.

Build angular application (should be automatically done after root dependencies install):
`cd angular-client && npm run prod` or `cd angular-client && npm run prod`.

You can now open the application directory in Materia Designer, and edit your:
-  Addons settings to use your own Mailjet account and templates.

Once your settings set and your app running in Materia Designer, you can test the application on http://localhost:8080 or in the *website* tab.

The application can be launched without Materia Designer, by using directly @materia/server:
`npm run start` or `yarn start` (website accessible on http://localhost:8080).
