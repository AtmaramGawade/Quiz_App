import React, { useRef, useState } from 'react'
import './Quiz.css';
import { data } from '../assets/data';
const Quiz = () => {

  const [index, setIndex] = useState(0);
  const[question, setQuestion]= useState(data[index]);
  const[lock, setLock] = useState(false);
  const[score, setScore] = useState(0);
  const[result, setResult] = useState(0);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
  

  let option_array = [option1, option2, option3, option4];
  

  const checkAns = (e, ans) =>{
    if (lock === false) {
      console.log(e.target);
      if(question.ans === ans){
        e.currentTarget.classList.add('correct');
        setLock(true);
        setScore(prev => prev +1);
      }else{
        e.currentTarget.classList.add('wrong');
        option_array[question.ans - 1].current.classList.add('correct');
        setLock(true);
      }
    }
   
  }

  const next = () => {
    if(index === data.length - 1){
      setResult(true);
      return 0;
    }
    if (lock) {
      const nextIndex = index + 1;
      if (nextIndex < data.length) {
        setIndex(nextIndex); 
        setQuestion(data[nextIndex])
        setLock(false); 

        option_array.forEach(option => {
        option.current.classList.remove('wrong', 'correct');
        return null;
        });
      }
    }
  };  

  return (
    <div className='container'>
        <h1>Quiz app</h1>
        <hr />
        {result?<> <h2>Your Score: {score} out of {data.length}</h2></>: <> <h2> {index+1} . {question.question}</h2>
        <ul>
            <li ref={option1} onClick={ (e)=>{checkAns(e, 1)}}>{question.option1}</li>
            <li ref={option2} onClick={ (e)=>{checkAns(e, 2)}}>{question.option2}</li>
            <li ref={option3} onClick={ (e)=>{checkAns(e, 3)}}>{question.option3}</li>
            <li ref={option4} onClick={ (e)=>{checkAns(e, 4)}}>{question.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className="index">{index + 1} out of {data.length} questions</div></>}
        
    </div>
  )
}

export default Quiz
