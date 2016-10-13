var pomoTimer = document.querySelector('.pomo-timer')
var pomoStarter = document.querySelector('.pomo-head-but')
var pomoTitle = document.querySelector('.pomo-head-title')
var pomoInput = document.querySelector('.pomo-middle-input')
var pomoBut = document.querySelector('.pomo-middle-but')
var pomoHolder = document.querySelector('.pomo-head')
var pomoList = document.querySelector('.pomo-bottom-list')
var pomoAlert = document.querySelector('.alertBox')
var pomoAlertText = document.querySelector('.alertBoxText')

var sec = 00
var min = 25
var timeStrg = ''
var isRunning = false
var hasTask = ''
var secondTime = false
var earlyLooking = false
var butTog = false

pomoHolder.style.transition = 'all 2s'
pomoTitle.style.transition = 'all 1s'
pomoTimer.style.transition = 'all 1s'
pomoAlert.style.transition = 'all 0.75s'





var clearTopFun = function(){
   pomoTitle.textContent = 'Pomodoro'
   pomoTitle.classList = 'pomo-head-title'
   pomoTimer.textContent = '25:00'
   pomoTimer.classList = 'pomo-timer'
   pomoStarter.textContent = 'Start'
   pomoHolder.style.backgroundColor = 'gray';
   pomoTitle.style.color = '#333';
   pomoTimer.style.color = '#e87e04';
   hasTask = ''
   console.log('im clean')
   isRunning = false
   secondTime = false
   earlyLooking = false


}

var startTimer = function(){
   if (isRunning === false){

      if (hasTask != ''){

         isRunning = true
         pomoInput.placeholder = 'Task Name'
         pomoHolder.style.backgroundColor = '#CF000F';


         var pomoCounter = setInterval(function(){
            isRunning = true
            if (sec >= 11){
               sec -= 1
            } else if (sec > 1 && sec < 11){
               sec -= 1
               sec = "0" + sec
            } else if (min <= 0){
               sec = "00"
               min = "00"

            }else {
               sec = 59
               min -= 1
            }

            timeStrg = min + ":" + sec
            pomoTitle.textContent = timeStrg
            pomoTitle.classList = 'pomo-timer'
            pomoTimer.textContent = hasTask
            pomoTimer.classList = 'pomo-head-title'
            pomoStarter.textContent = 'Clear'




            if( min === '00'){
               pomoTitle.textContent = 'Done!'
               pomoTimer.textContent = 'Do another?'

               earlyLooking = true


               pomoHolder.style.backgroundColor = '#2ABB9B';
               pomoTitle.style.color = '#fff';
               pomoTimer.style.color = '#F4D03F';


                  clearInterval(pomoCounter)


            }


            if (timeStrg === '1:01') {
               pomoHolder.style.backgroundColor = '#2ABB9B';
               pomoTitle.style.color = '#fff';
               pomoTimer.style.color = '#F4D03F';

            }




         }, 1000);
      } else {
         
         pomoAlertText.textContent = "Give me a task!"
         alertBoxFun()
      }
   } else {
      //THROW AN ERROR

      pomoAlertText.textContent = "I'm already working!"
      alertBoxFun()
   }
}

var pomo25Count = function(){
   console.log(isRunning)
   if (isRunning === false){
      sec = 00
      min = 25
      startTimer()
   } else if (earlyLooking === true){
      clearTopFun()

   }else {
      clearButAct()
      isRunning = false
   }
}

var anotherThing = function(){
   if (hasTask = ''){
      pomoAlertText.textContent = 'Give me a task!'
      alertBoxFun()
   } else {
      if (pomoInput.value === '') {
         pomoAlertText.textContent = 'Give me a task!'
      } else {
         pomoAlertText.textContent = 'Stored...'
         alertBoxFun()
         var taskHldr = pomoInput.value
         var newLiNode = document.createElement('li')
         newLiNode.textContent = taskHldr
         var newTrashNode = document.createElement('span')
         newTrashNode.classList = "glyphicon glyphicon-trash listBut"
         var newPlayNode = document.createElement('span')
         newPlayNode.classList = "glyphicon glyphicon-play listBut"
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

var newPomodor = function(evt){

   var task = pomoInput.value

   if(evt.keyCode === 13 || evt.type === 'click'){

      if ( task === '') {
         pomoAlertText.textContent = 'Give me a task!'
         alertBoxFun()


      } else if (isRunning === false){
                  pomoAlertText.textContent = 'Give me something to do below'
                  hasTask = task
                  pomoInput.value = ''
                  pomoInput.placeholder = 'Rename Current Task?'
                  pomoTitle.textContent = hasTask



      } else if (evt.type === 'click'){
         pomoAlertText.textContent = 'Stored...'
         alertBoxFun()
      }else {
         console.log('im already working')
         pomoAlertText.textContent = "I'll store that for you.."
         alertBoxFun()
         // THIS IS WHERE YOU ARE GOIN TO PUSH TO THE LIST BELOW
         // AT THE LEAST JUST CALL THE FUNCTION HERE AND MAKE IT SOMEWHERE ELSE
         var newLiNode = document.createElement('li')
         newLiNode.textContent = task
         var newTrashNode = document.createElement('span')
         newTrashNode.classList = "glyphicon glyphicon-trash listBut"
         var newPlayNode = document.createElement('span')
         newPlayNode.classList = "glyphicon glyphicon-play listBut"
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

   var first = this.parentElement
   var final = first.parentElement
   pomoList.removeChild(final)
   pomoAlertText.textContent = "And it is gone..."
   alertBoxFun()
}

var startBTimer = function(){

   if (isRunning === true){
      // THIS IS WHERE YOU WILL THROW THE ERROR
      pomoAlertText.textContent = "I'm already working!"
      alertBoxFun()
   } else if (pomoTitle.textContent != 'Pomodoro') {


      var nameHolder = pomoTitle.textContent

      // pomoInput.placeholder = 'Rename Current Task?'

      restoreTask(nameHolder)

      var another = this.parentElement
      var funFunction = another.parentElement
      hasTask = funFunction.textContent
      pomoTitle.textContent = hasTask
      pomoList.removeChild(funFunction)

   }else {
      pomoInput.placeholder = 'Rename Current Task?'
      var another = this.parentElement
      var funFunction = another.parentElement
      hasTask = funFunction.textContent
      pomoTitle.textContent = hasTask
      pomoList.removeChild(funFunction)



   }
}
var clearButAct = function(){
   isRunning = false
   min = 00
   sec = 00
   // clearTopFun()
   hasTask = ''


}

var restoreTask = function(nameStr) {
   var newLiNode = document.createElement('li')
   newLiNode.textContent = nameStr
   var newTrashNode = document.createElement('span')
   newTrashNode.classList = "glyphicon glyphicon-trash listBut"
   var newPlayNode = document.createElement('span')
   newPlayNode.classList = "glyphicon glyphicon-play listBut"
   var newButHolder = document.createElement('div')

   newButHolder.appendChild(newPlayNode)
   newButHolder.appendChild(newTrashNode)

   newLiNode.appendChild(newButHolder)

   pomoInput.value = ''
   pomoList.appendChild(newLiNode)

   newTrashNode.addEventListener('click', remvThis)
   newPlayNode.addEventListener('click', startBTimer )

}

var alertBoxFun = function(){
   if (hasTask === ''){
      pomoAlertText.textContent = 'Give me something to do below'
   }

   pomoAlert.style.right = '0';

   setTimeout(function(){
      pomoAlert.style.transition = 'all 2s'
      pomoAlert.style.right = '-100%'
   }, 5000);
}





pomoStarter.addEventListener('click', pomo25Count)
pomoInput.addEventListener('keypress', newPomodor)
pomoInput.addEventListener('click', alertBoxFun)
pomoBut.addEventListener('click', anotherThing)
