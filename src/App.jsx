import { useState } from 'react'
import { questions } from '../data/questions.js'
import { parse } from 'node-html-parser'
import './App.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { useAuthContext } from "./contexts/AuthContext"

/*
This shuffle function uses the Fisher-Yates shuffle algorithm
It returns a new shuffled array, and more importantly it is 
unbiased unlike some other common shuffling algorithms.

Resources:
- Visit https://javascript.info/task/shuffle to learn more
- Wiki: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
*/
function shuffle(array) {
  let new_array = [...array];
  for (let i = new_array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [new_array[i], new_array[j]] = [new_array[j], new_array[i]];
  }

  return new_array;
}

function App() {

  const auth = useAuthContext();
  const isAuthenticated = auth.isAuthenticated();

  // Initialize a set of random question indexes per review session
  const [sessionIndexes, setSessionIndexes] = useState(shuffle(new Array(questions.length).fill(0).map((_, i) => i)));

  // The current index into sessionIndexes
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);


  const handleNextQuestion = () => {
    // Increment actionQuestionIndex and rollover if it exceeds
    // the length of the questions Array
    let next_index = (activeQuestionIndex + 1) % sessionIndexes.length;
    console.log(activeQuestionIndex, next_index)
    setActiveQuestionIndex(next_index)
  }

  const handlePrevQuestion = () => {
    // To avoid negative indexes, the previous question index is calculated
    // by adding the total number of questions (minus 1) to the current index
    // and rolls over to the beginning of the range using a modulus whenever 
    // the new index exceeds the length of the questions Array
    let prev_index = (activeQuestionIndex + sessionIndexes.length - 1) % sessionIndexes.length;
    console.log(activeQuestionIndex, prev_index)
    setActiveQuestionIndex(prev_index)
  }


  return (

    <div className="flex flex-col items-center px-4 mx-auto font-display bg-base-100">
      <Header/>
      {isAuthenticated ?
        <form onSubmit={() => auth.logout()} className="btn-login">
          <button type="submit" className="btn btn-primary">
            Logout
          </button>
        </form>
        : <form action='/auth/discord' className="btn-login">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      }
      <header className="pt-32 pb-7">
        <h1 className=" text-white text-[3rem]">Banki Brunch</h1>
      </header>

      <main className='flex flex-col gap-4 items-center max-w-lg text-center font-body'>
        <div className="flex flex-row gap-8">
        <svg onClick={handlePrevQuestion} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <div id="question">
          {/* Use the activeQuestionIndex to access the corresponding index into questions for the current session
              Then use the parse module to handle any HTML formatting in the question and return the formatted text
          */}
          <h2 className={`text-[1.5rem] pb-6 text-secondary`}>{parse(questions[sessionIndexes[activeQuestionIndex]].question).text}</h2>
        </div>
        <svg onClick={handleNextQuestion} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        </div>
        <div id="answer" className={`max-w-xl card bg-primary text-secondary`}>
          <div className="card-body">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet a dignissimos officia nostrum vitae sequi maxime, delectus non iste, error consequatur consequuntur ad deleniti est aspernatur vero laborum tenetur fugiat!Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet a dignissimos officia nostrum vitae sequi maxime, delectus non iste, error consequatur consequuntur ad deleniti est aspernatur vero laborum tenetur fugiat!</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
