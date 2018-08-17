# Firestore React Redux Typescript Blog App

__Motivation__: Firebase hosting offers a cost effective way to store your data as well as host your apps front and back end.  

Since it is backed by google's CDN, your the response time is faster than the free tier on other hosting platforms.

[Firestore security rules](https://firebase.google.com/docs/firestore/security/get-started) allow scripting of create, update, delete, access rules without hand rolling your own backend validation service.  It's a mintor pain to decode.  The beta security rules simulator is buggy and labor intensive to run.  But if you squint, you can see the elegance of having your data access rules in one document.

It's not all roses.  You will need the firebase functions/cloud functions roll your own referential integrity.  This is made harder by not having the ability to setup debug those functions.  

## Folder structure

```text
|-- client               // front end
|-- firebase-functions   // backend triggers
```

## Setup

1. Clone and installed packages
2. Create your google firebase project
3. Configure `client`
4. Configure `firebase-functions`
5. Build and deploy

### Clone and installed packages

- clone the repository, then:
  - `cd client` + `npm i`
  - `cd firebase-functions/functions` + 'npm i`

### Create a Firebase Project

- [Google firebase console](https://console.firebase.google.com)
- Add a project (make note of the **project name**)

### Configure `client`

- In the `client` folder
  - Point `.firebaserc` at your project

```javascript
{
  "projects": {
    "default": "<project-name>"
  }
}
```

- In the google firebase console select "Project Overview" -> "Add Firebase to your web app"
- Copy the config properites
- In the `client/src` folder
  - Replace the config with the one from your project

```javascript
var config = {
  apiKey: "<your project api key>",
  authDomain: "<project-name>.firebaseapp.com",
  /* ... */
};
```

### Configure `firebase-functions`

Replace `<project name>` in `.firebaserc` with yours

```javascript
{
  "projects": {
    "default": "<project-name>"
  }
}
```

### Build and deploy

To deploy you will need [firebase-tools](https://firebase.google.com/docs/hosting/quickstart)  `npm install -g firebase-tools`

#### client

This runs off firebase hosting.  

- client
  - `npm run build`
  - `firebase deploy`

- firebase-functions
  - `cd functions` then `npm run build`
  - `firebase deploy --only functions`
