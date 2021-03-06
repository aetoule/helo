require('dotenv').config();
const massive = require('massive');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const controller = require('./controller');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365
  }
}));

massive(process.env.CONNECTION_STRING).then(database => {
  app.set('db', database);
  console.log('database is kickin :call_me_hand:');
}).catch(error => {
  console.log('-------------- database issue', error);
});

app.get(`/callback`, (req, res) => {
  console.log('/callback fired');
  
  const payload = {
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    code: req.query.code,
    grant_type: 'authorization_code',
    redirect_uri: `http://${req.headers.host}/callback`
  };

  function tradeCodeForAccessToken() {
    return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
  }

  function tradeAccessTokenForUserInfo(accessTokenResponse) {
    const accessToken = accessTokenResponse.data.access_token;
    return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`);
  }

  function storeUserInfoInDatabase(response) {
    const auth0id = response.data.sub;
    const db = req.app.get('db');
    return db.get_user_author_info(auth0id).then(users => {
      const userArray = {
        name: response.data.name,
        email: response.data.email,
        picture: response.data.picture
      };
      if (users.length) {
        const user = users[0];
        console.log(userArray);
        req.session.user = userArray;
        res.redirect('/dashboard');
      } else {
        return db.create_user(auth0id).then(newUser => {
          req.session.user = userArray;
          res.redirect('/dashboard');
        }).catch(error => {
          console.log('error in db.create_user', error);
          res.status(500).send('Unexpected error');
        });
      }
    }).catch(error => {
      console.log('error in db.get_user_author_info', error);
      res.status(500).send('Unexpected error');
    });
  }

  tradeCodeForAccessToken()
  .then(tradeAccessTokenForUserInfo)
  .then(storeUserInfoInDatabase)
  .catch(error => {
    console.log('error in /callback', error);
    res.status(500).send('Unexpected error');
  });
});

app.post('/api/register-user', controller.postUser);
app.post('/api/logging-in-user', controller.postLogin);
app.get('/api/posts', controller.getPosts);
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.send('session destroyed');
})

// app.get('/api/memes', memesController.getDb);
app.get('/api/user-data', (req, res) => {
  res.json(req.session.user );
});
// app.post('/api/logout', (req, res) => {
//   req.session.destroy();
//   res.send({redirect: '/'});
// });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} `);
});



// require('dotenv').config();
// const massive = require('massive');
// const express = require('express');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const controller = require('./controller');
// const axios = require('axios');
// // heroku databasename: dry-eyrie-84545

// const app = express();
// app.use(bodyParser.json());
// //  so we have a place to store our user's unique data when they log in
// app.use(session ({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//    saveUninitialized: false 
// }))

// //app.use(express.static(`${__dirname}/../build`));

// massive(process.env.CONNECTION_STRING).then(database => {
//     app.set('db', database);
//     console.log('database is workingggg');
// }).catch(error => {
//     console.log('-------------- database issue', error);
// });

// // We need to do many async calls in a series; we'll use promises to do this in a readable way.
// app.get('/callback', (req, res) => {
//     console.log('herro', req);
//     const payload = {
//         client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
//         client_secret: process.env.AUTH0_CLIENT_SECRET,
//         code: req.query.code,
//         grant_type: 'authorization_code',
//         redirect_uri: `http://${req.headers.host}/callback`
//     };
//     // exchangeCodeForAccessToken()
//     // .then(exchangeAccessTokenForUserInfo)
//     // .then(fetchAuth0AccessToken)
//     // .then(fetchGitHubAccessToken)
//     // .then(setGitTokenToSession)
//     // .catch(error => {
//     //   console.log('Server error', error);
//     //   res.status(500).send('An error occurred on the server. Check the terminal.');
//     // });
//     // function exchangeCodeForAccessToken() {
//     //     return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
//     // }

//     // We'll create a payload of data to send to Auth0, and send it using axios. This is step 5 in the diagram.
//     function exchangeCodeForAccessToken() {
//         console.log('something1')
//         return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
//     }

//     // takes in return value from exchangeCodeForAccessToken function.
//     function exchangeAccessTokenForUserInfo(accessTokenResponse) {
//         console.log('something2')

//         // get the accessToken out of accessTokenResponse
//         const accessToken = accessTokenResponse.data.access_token;
//         return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`);
//     }

//     // set the user information to session, then make a call to the API Explorer Application to get an Auth0 access_token
//     function fetchAuth0AccessToken(userInfoResponse) {
//         console.log('something3')
//         req.session.user = userInfoResponse.data;
//         const payload = {
//             grant_type: 'client_credentials',
//             client_id:process.env.AUTH0_API_CLIENT_ID,
//             client_secret:process.env.AUTH0_API_CLIENT_SECRET,
//             audience:`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`
//         }
//         return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,payload)
//     }

//     // Use the Auth0 access token from the previous step to fetch an access token for use with GitHub. It will allow us to make REST calls to GitHub on behalf of the user.
//     function fetchGitHubAccessToken(auth0AccessTokenResponse) {
//         console.log('something4')
//         // Using an authorization header with a value that starts with Bearer is a common way of sending credentials in REST calls
//         const options = {
//             headers: {
//                 authorization: `Bearer ${auth0AccessTokenResponse.data.access_token}`
//             }          
//         }
//         // we're using the sub mentioned in the previous step to indicate that we want an oauth token for that user
//         return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${req.session.user.sub}`, options);
//     }

//     // builds a function which gets the access token from the response of the previous function, puts it on our session at req.session.gitHubAccessToken, then redirects our user back to the home page

//     // takes in oauth token for that user as a parameter (?)
//     function setGitTokenToSession(gitHubAccessTokenResponse) {
//         console.log('something5')
//         const gitHubIdentity = gitHubAccessTokenResponse.data.identities[0];
//         console.log(gitHubIdentity);
//         req.session.gitHubToken = gitHubIdentity.access_token;
//         res.redirect('/dashboard');
//     }

//     exchangeCodeForAccessToken() 
//         .then(exchangeAccessTokenForUserInfo)
//         .then(fetchAuth0AccessToken)
//         .then(fetchGitHubAccessToken)
//         .then(setGitTokenToSession)
//         .catch(err => { 
//             console.log('Servor error', err);
//             res.status(500).send('An error occured on the server. Check terminal');
//         });
// }); 

// // app.post('/api/posts', (req, res) => {
// //     let { post } = req.body;
// //     req.session.post = post;
// //     res.send(req.session)
// // })

// app.post('/api/register-user', controller.postUser);
// app.post('/api/logging-in-user', controller.postLogin);
// app.get('/api/posts', controller.getPosts);
// app.post('/api/logout', (req, res) => {
//     req.session.destroy();
//     res.send();
// })

// const PORT = 4123;
// app.listen(PORT, () => {
// console.log(`Server listening on port ${PORT} `);
// });
