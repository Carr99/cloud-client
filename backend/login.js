const { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } = require('firebase/auth')
const { collection, getDoc, setDoc, doc } = require('firebase/firestore')
const session = require('express-session');

module.exports = function (app, db) {

  app.use(session({
    secret: 'u8oij132U()!"#o1239sss0',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
  }));

  app.post('/api/login', (req, res) => {
    let data = req.body
    let auth = getAuth()
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        // Signed in 
        user = userCredential.user
        req.session.user = { 'email': user.email, 'role': await getUserRole(user.uid), 'uid': user.uid }
        res.json({ 'email': user.email, 'role': req.session.user.role })
      })
      .catch((error) => {
        res.status(401).json({ "status": error })
      })
  })

  app.get('/api/login', async (req, res) => {
    if (req.session.user == null) {
      res.json({ _error: 'Not logged in' })
      return
    }
    res.json({ 'email': req.session.user.email, 'role': req.session.user.role });
  })

  app.post('/api/register', (req, res) => {
    let data = req.body
    let username = data.username
    let auth = getAuth()
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        // Signed in 
        let user = userCredential.user
        addUserInfoDB(user.uid, username)
        req.session.user = { 'email': user.email, 'role': await getUserRole(user.uid), 'uid': user.uid }
        res.json({ 'email': user.email, 'role': req.session.user.role })
      })
      .catch((error) => {
        res.status(401).json({ "status": 'Something went wrong' })
      })
  })

  app.delete('/api/login', (req, res) => {
    delete req.session.user;
    res.json({ success: 'logged out' });
  })

  async function getUserRole(uid) {
    let docRef = doc(collection(db, 'user'), uid)
    let docSnap = await getDoc(docRef)

    let userRole = docSnap.data().userRole
    return userRole
  }

  async function addUserInfoDB(uid, username) {
    await setDoc(doc(db, 'user', uid), {
      username: username,
      userRole: 'User'
    })
  }
}