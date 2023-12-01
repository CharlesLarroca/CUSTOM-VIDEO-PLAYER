const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

//Quando a função é chamada se o video estiver pausado ele ira para play e vice versa
function togglePlay(){
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}

//Função para alterar botão play/pause
function updateButton(){
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon
}

//Função para avançar ou retroceder
function skip(){
  video.currentTime += parseFloat(this.dataset.skip) //somo ou subtrai do tempo atual do video o valor dentro dao data-skip, parsefloat aplicado pois o valor dentro do elem html é uma string
}

//Função para aumentar ou diminuir volume/velocidade de reprodução
function handleRangeUpdate(){
  if (this.name === 'volume') {
    video.volume  = this.value
  } 
  if (this.name === 'playbackRate') {
    video.playbackRate  = this.value
  }
}

//Função atualiza a barra de progresso
function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

//Função que arrasta para frente/tras a barra de progresso, alterando o time do video
function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

//Evento clique botão/video de play/pause
video.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)

//Evento altera botão play/pause
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

//Evento para atualizar a barra de progresso
video.addEventListener('timeupdate', handleProgress)

//Evento para acionar o avançar ou retroceder
skipButtons.forEach(button => button.addEventListener('click', skip))

//Evento para acionar mudanças no range de volume e velocidade de reprodução
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

//Evento para acionar o movimento de click na barra de progresso
let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mouseup', () => mousedown = false)