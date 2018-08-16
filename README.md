# Firesttore based blog app

Firebase offers

## Folder structure

```text
|-- client               // front end
|-- firebase-functions   // backend triggers
```

## Setup Overview

1. Create firebase project
2. Configure `client` and `firebase-functions` to point to your firebase project
3. Run initialize the firestore database
4. Deploy firiebase functions
5. Deploy client

### Create Firebase Project

- Go to the [Google firebase console](https://console.firebase.google.com)
- When done you will be taken to the project console.

### Configuration the client

- Select "Project Overview" on the top left.
- Then select "Add firebase to your web app"
- Copy the config

```
var config = {
  apiKey: "AIzaSyDsEJPeMxqk-4QmDzuBSdkKFuAq.....",
  authDomain: "<project-name>.firebaseapp.com",
  ...
};
```

## `client` Setup

### Create a firebase project

- [Firebase console](https://console.firebase.google.com/)
- Create a firebase project

### Copy paste firebase nitialize properties to client

- In the firebse console, select `Project Overview` -> `Add Firebase to you web app`
- Copy the `var config = {...}
- Replace the config properites in `client/src/firebase.cnfig.js`
