# Firestore React Redux Typescript Blog App

__Motivation__: Firebase hosting offers a cost effective way to store your data as well as host your app's front and back end.  

Since it is backed by google's CDN, the first load response time is faster than the free tier on other hosting platforms.

[Firestore security rules](https://firebase.google.com/docs/firestore/security/get-started) allow scripting of create, update, delete, access rules without hand rolling your own backend validation service.  It's a major pain to debug permission errors.  The beta security rules simulator is buggy and labor intensive.  But if you squint, you can see the elegance of having your data access rules in one document.

This project uses firebase functions/cloud functions for a weak form of referential integrity as well as triggers.

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
5. Configure "blog settings"
6. Deploy
7. Login


### Clone and installed packages

clone the repository, then:

```bash
cd client
npm i

cd firebase-functions/functions 
npm i
```

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

### Configure "blog settings"

Ability to set blog title and description will be added to the UI.  For now it's a manual process.

1. In your projects firebase console
2. Select "Database"
3. add a collection/doc `settings/blog` 

The add the following fields

```text
blog_title: '<your title>'
blog_description: '<your blog description>`
```

### Deploy

To deploy you will need [firebase-tools](https://firebase.google.com/docs/hosting/quickstart)  `npm install -g firebase-tools`

#### client deploy

```bash
// from project root
cd client
npm run deploy
```

#### firebase-functions deploy

```bash
// from project root
cd firebase-functions/functions/
npm run deploy
```

### Login

The first user to signin is given the admin role.

- Navigate to the url specified when you deployed the client
- Go to `/signin`
- Once signed in you can add / edit posts.
