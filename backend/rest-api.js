const { collection, getDocs, getDoc, doc } = require('firebase/firestore')
const cors = require('cors')

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

  async function getUserRole(req) {
    let userRole = req.session.user.role
    if (userRole === null) return 'Visitor'
    return userRole
  }
}