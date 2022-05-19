const { collection, getDocs, getDoc, setDoc, doc } = require('firebase/firestore')
const { getAuth, updatePassword } = require('firebase/auth')
const cors = require('cors');

module.exports = function setupREST(app, db) {

  app.get('/api', cors(), (req, res) => {
    res.sendFile('firstPage.html', { root: __dirname });
  })

  app.get('/api/allQuizzes', async (req, res) => {
    if (await getUserRole(req) === 'Visitor') {
      res.status(401).json({ error: 'Not allowed' })
      return
    }

    let resultJson = []
    let allDocs = []

    let collectionRef = collection(db, 'quiz')
    let querySnapshot = await getDocs(collectionRef)

    querySnapshot.forEach((doc) => {
      allDocs.push(doc)
    })

    for (let doc of allDocs) {
      let subColRef = collection(db, "quiz", doc.id, "question")
      let questions = await getDocs(subColRef)
      let numQuestions = 0
      questions.forEach(() => {
        numQuestions++
      })
      let quiz = { 'name': doc.id, 'category': doc.data().category, questions: numQuestions }
      resultJson.push(quiz)
    }
    let result = { quizzes: resultJson }
    res.json(result)
  })

  app.get('/api/allUsers', async (req, res) => {
    if (await getUserRole(req) !== 'Admin') {
      res.status(401).json({ error: 'Not allowed' })
      return
    }

    let collectionRef = collection(db, 'user')
    let querySnapshot = await getDocs(collectionRef)

    let allUsers = []
    querySnapshot.forEach((doc) => {
      allUsers.push(doc.data())
    })

    let result = { users: allUsers }
    res.json(result)
  })

  app.get('/api/quiz/:id', async (req, res) => {
    if (await getUserRole(req) === 'Visitor') {
      res.status(401).json({ error: 'Not allowed' })
      return
    }
    let resultJson = []
    let allDocs = []

    let quizId = req.params.id

    let collectionRef = collection(db, 'quiz', quizId, "question")
    let querySnapshot = await getDocs(collectionRef)

    querySnapshot.forEach((doc) => {
      allDocs.push(doc)
    })

    for (let doc of allDocs) {

      let quiz = {
        'name': doc.id, 'answer': doc.data().answer, 'option1': doc.data().option1,
        'option2': doc.data().option2, 'option3': doc.data().option3
      }
      resultJson.push(quiz)
    }
    let result = { quizzes: resultJson }
    res.json(result)

  })
  app.get('/api/highscores/:id', cors(), async (req, res) => {
    let resultJson = []
    let allDocs = []

    let quizId = req.params.id

    let collectionRef = collection(db, 'quiz', quizId, "scores")
    let querySnapshot = await getDocs(collectionRef)

    querySnapshot.forEach((doc) => {
      allDocs.push(doc)
    })

    for (let aDoc of allDocs) {
      let docRef = doc(db, "user", aDoc.id);
      let docSnap = await getDoc(docRef);
      let user = await docSnap.data().username
      let score = {
        'user': user, 'score': aDoc.data().score
      }
      resultJson.push(score)
    }

    let result = { scores: resultJson }
    res.json(result)
  })

  app.get('/api/profile', async (req, res) => {
    let docRef = doc(db, "user", req.session.user.uid);
    let docSnap = await getDoc(docRef);
    let user = await docSnap.data().username;
    let profile = { 'user': user, 'email': req.session.user.email };
    res.json(profile)
  })

  app.post('/api/score', async (req, res) => {
    let data = req.body
    let quizz = data.quizz
    let user = req.session.user.uid
    let score = data.score

    await setDoc(doc(db, "quiz", quizz, "scores", user), {
      score: score,
    }).then(() => {
      res.json("ScoreSaved")
    }).catch((error) => {
      res.json(error)
    });

  })

  app.post('/api/updatePassword', (req, res) => {
    let data = req.body
    let newPassword = data.password
    const auth = getAuth();

    const user = auth.currentUser;

    updatePassword(user, newPassword).then(() => {
      res.json("Password updated")
    }).catch((error) => {
      res.json(error)
    });
  })


  async function getUserRole(req) {
    let userRole = req.session.user.role
    if (userRole === null) return 'Visitor'
    return userRole
  }
}