var selectedQuiz = 'Soccer quiz'

async function router() {
  let route = location.pathname;
  // transform route to be a path to a partial
  route = route === '/' ? '/login' : route;
  route = '/partials' + route + '.html';
  // load the content from the partial
  let content = await (await fetch(route)).text();
  // if no content found then load the start page
  content.includes('<title>Error</title>') && location.replace('/');
  // replace the content of the main element
  document.querySelector('main').innerHTML = content;
  // run the productLister function (in another file)
  // if the route is '/partials/products.html';
  if (route === '/partials/login.html') {
    login();
  } else if (route === '/partials/register.html') {
    register();
  } else if (route === '/partials/admin.html') {
    admin();
  } else if (route === '/partials/question.html') {

    initQuestions(selectedQuiz);
    /* 
    Use this format on quizzes saved localy
    localQuiz = []
        let quiz = {
          'name': 'Test Quiz', 'answer': 'This is the answer', 'option1': 'option 1',
          'option2': 'option 2', 'option3': 'option 3'
        }
        localQuiz.push(quiz)
        window.localStorage.setItem('QuizId',
          JSON.stringify(localQuiz)
        ) */
  } 
   else if (route === '/partials/quizzes.html') {
    initQuizzes()
      
  }
}

// runt the router when using the back/forward buttons
window.addEventListener('popstate', router);

// run the router on page load
router();