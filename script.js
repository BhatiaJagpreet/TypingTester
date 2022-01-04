const word=document.getElementById('word')
const text=document.getElementById('text')
const scoreEl=document.getElementById('score')
const timeEl=document.getElementById('time')
const endGameEl=document.getElementById('end-game-container')
const settingsBtn=document.getElementById('settings-btn')
const settings=document.getElementById('settings')
const settingsForm=document.getElementById('settings-form')
const difficultySelect=document.getElementById('difficulty')

//List of words for game
const words=[
    'sigh','tense','airplane','ball','pies','juice','warlike','bad','north','dependent','steer','silver','highfaultin','superficial','quince','eight','feeble','admit','drag','loving'
]


//set difficulty to value in local storage
let difficulty=localStorage.getItem('difficulty') !==null ? localStorage.getItem('difficulty') : 'medium'

//set difficulty select value
difficultySelect.value=localStorage.getItem('difficulty') !==null ? localStorage.getItem('difficulty') : 'medium'

//init word

let randomWord

//Init score
let score=0


//Init time
let time=10


//focus on text on start
text.focus()


//Start counting down
const timeInterval=setInterval(updateTime, 1000)
//Generate random word from array
function getRandomWord (){
    return words[Math.floor(Math.random()*words.length)]
}

//Add word to dom

function addWordToDom (){
    randomWord=getRandomWord()
    word.innerHTML=randomWord
}
addWordToDom()


//game over show endscreen

function gameOver(){
endGameEl.innerHTML=`
 <h1>Time ran out</h1>
 <p>Your final score is ${score}</p>

 <button onclick="location.reload()">Reload</button>
`
endGameEl.style.display='flex'
}
//update time
function updateTime(){
    time--
    timeEl.innerHTML=time +'s'
    if(time===0){
        clearInterval(timeInterval)
        //end game
        gameOver()
    }
}
//update score
function updateScore(){
    score++
    scoreEl.innerHTML=score
}
//Event listeners


//typing
text.addEventListener('input', (e)=>{
    const insertedText=e.target.value
    if(insertedText===randomWord){
        addWordToDom()


        updateScore()
        //clear
        e.target.value=''
        if(difficulty==='hard'){
            time +=2
        }else if(difficulty==='medium'){
            time +=3
        }else{
            time +=5
        }
        updateTime()
    }
})


//settings btn click
settingsBtn.addEventListener('click', ()=>{
    settings.classList.toggle('hide')
})


//settings select

settingsForm.addEventListener('change', (e)=>{
    difficulty=e.target.value

    localStorage.setItem('difficulty', difficulty)

})
