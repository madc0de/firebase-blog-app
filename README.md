
This is a simple React blog that presist posts in Firestore.


### Clone the project
```
npm i
```

### Create a firebase project
*  [Firebase console](https://console.firebase.google.com/)
*  Add a project

### Add the firebase config to the app
*  In the project overview select `Add Firebase to your app`, 
*  Copy the following and replace the contents of `src/firestore.config.js`
```
 var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};
```

