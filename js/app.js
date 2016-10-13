var pomoTimer = document.querySelector('.pomo-timer')
var pomoStarter = document.querySelector('.pomo-head-but')
var pomoTitle = document.querySelector('.pomo-head-title')
var pomoInput = document.querySelector('.pomo-middle-input')
var pomoBut = document.querySelector('.pomo-middle-but')
var pomoHolder = document.querySelector('.pomo-head')
var pomoList = document.querySelector('.pomo-bottom-list')

var sec = 00
var min = 25
var timeStrg = ''
var isRunning = false
var hasTask = ''

pomoHolder.style.transition = 'all 2s'
pomoTitle.style.transition = 'all 1s'
pomoTimer.style.transition = 'all 1s'


var clearTopFun = function(){
   pomoTitle.textContent = 'Pomodoro'
   pomoTitle.classList = 'pomo-head-title'
   pomoTimer.textContent = '25:00'
   pomoTimer.classList = 'pomo-timer'
   pomoStarter.textContent = 'Start'
   pomoHolder.style.backgroundColor = 'gray';
   pomoTitle.style.color = '#333';
   pomoTimer.style.color = '#e87e04';
}

var startTimer = function(){
   if (isRunning === false){

      if (hasTask != ''){

         isRunning = true
         pomoInput.placeholder = 'Task Name'

         if (isRunning === true){
            pomoStarter.addEventListener('click', function(){
               isRunning = false
               clearInterval(pomoCounter)
               clearTopFun()
               console.log('top')
               console.log(isRunning)
            })
         }

         var pomoCounter = setInterval(function(){
            if (sec >= 11){
               sec -= 1
            } else if (min <= 0){
               sec = "00"
               min = "00"

               isRunning = false
               clearInterval(pomoCounter)
               resetPomo()
            } else if (sec > 1 && sec < 11){
               sec -= 1
               sec = "0" + sec
            } else {
               sec = 59
               min -= 1
            }
            console.log(isRunning)
            timeStrg = min + ":" + sec
            pomoTitle.textContent = timeStrg
            pomoTitle.classList = 'pomo-timer'
            pomoTimer.textContent = hasTask
            pomoTimer.classList = 'pomo-head-title'
            pomoStarter.textContent = 'Clear'
            pomoHolder.style.backgroundColor = '#CF000F';

            var resetPomo = function(){
               pomoTitle.textContent = 'Done!'
               pomoTimer.textContent = 'Do another?'
               
               setTimeout(function(){
                  clearTopFun()
               }, 5000);

            }



            if (timeStrg === '1:01') {
               pomoHolder.style.backgroundColor = '#2ABB9B';
               pomoTitle.style.color = '#fff';
               pomoTimer.style.color = '#F4D03F';

            }


         }, 1000);
      } else {
         console.log('give me a task')
      }
   } else {
      //THROW AN ERROR
      console.log('im already working')
   }
}

var pomo25Count = function(){

    startTimer()

}

var newPomodor = function(evt){

   var task = pomoInput.value

   if(evt.keyCode === 13 || evt.type === 'click'){
      if ( isRunning === false) {

         hasTask = task
         pomoInput.value = ''
         pomoInput.placeholder = 'Rename Current Task?'
         pomoTitle.textContent = hasTask


      } else {
         console.log('im already working')
         // THIS IS WHERE YOU ARE GOIN TO PUSH TO THE LIST BELOW
         // AT THE LEAST JUST CALL THE FUNCTION HERE AND MAKE IT SOMEWHERE ELSE
         var newLiNode = document.createElement('li')
         newLiNode.textContent = task
         var newTrashNode = document.createElement('span')
         newTrashNode.classList = "glyphicon glyphicon-trash"
         var newPlayNode = document.createElement('span')
         newPlayNode.classList = "glyphicon glyphicon-play"
         var newButHolder = document.createElement('div')

         newButHolder.appendChild(newPlayNode)
         newButHolder.appendChild(newTrashNode)

         newLiNode.appendChild(newButHolder)

         pomoInput.value = ''
         pomoList.appendChild(newLiNode)

         newTrashNode.addEventListener('click', remvThis)
         newPlayNode.addEventListener('click', startBTimer )

      }
   }


}

var remvThis = function(){
   console.log(this)
   var first = this.parentElement
   var final = first.parentElement
   pomoList.removeChild(final)
}

var startBTimer = function(){
   var another = this.parentElement
   var funFunction = another.parentElement
   hasTask = funFunction.textContent
   startTimer()
}




pomoStarter.addEventListener('click', pomo25Count)
pomoInput.addEventListener('keypress', newPomodor)
pomoBut.addEventListener('click', newPomodor)
