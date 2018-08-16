# Firesttore based blog app

This is a simple React blog using firestore as a backend.

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

## Setup

- Create a firebase project to host you client and functions, make note of your `firebase project name`.
- Configuration
  - client
    - Copy firebase configuration to your clients `firebase.config.js` file
  - firebase-functions
    - enter your `firebase project name` in `./firebase-functions/.firebaserc`

## `client` Setup

### Create a firebase project

- [Firebase console](https://console.firebase.google.com/)
- Create a firebase project

### Copy paste firebase nitialize properties to client

- In the firebse console, select `Project Overview` -> `Add Firebase to you web app`
- Copy the `var config = {...}
- Replace the config properites in `client/src/firebase.cnfig.js`
