function init(){
  'use strict';
  var arr = document.querySelectorAll('.inputContainer');
  for (var i = 0; i < arr.length; i++)
    addAddButton(arr[i]);
  arr = document.querySelectorAll('.detailContainer');
  for (var i = 0; i < arr.length; i++)
    addAddButton(arr[i]);
  var button = document.getElementById('genMD');
  button.addEventListener('click', function(){showModal(generateMarkdown());});
}
function addInput(parent){
  'use strict';
  var newEl = document.createElement('p');
  newEl.classList.add('input');
  newEl.innerHTML = '<input type="text">';
  addRemoveButton(newEl);
  parent.appendChild(newEl);
}
function addDetail(parent){
  'use strict';
  var newEl = document.createElement('p');
  newEl.innerHTML = 'Name: <input type="text" class="name"><br>Image URL <em>(Optional)</em>: <input type="text" class="image"><br>Bullets: ';
  newEl.classList.add('detail');
  newEl.classList.add('inputContainer');
  addAddButton(newEl);
  addRemoveButton(newEl);
  addInput(newEl);
  parent.appendChild(newEl);
}
function removeInput(element){
  element.parentNode.removeChild(element);
}
function addAddButton(parent){
  var button = document.createElement('button')
  button.type = 'button';
  button.innerHTML = '<img src="ic_add_black_24px.svg" alt="ADD">';
  button.classList.add('add');
  if (parent.classList.contains('inputContainer'))
    button.addEventListener('click', function(){addInput(this.parentNode);});
  else
    button.addEventListener('click', function(){addDetail(this.parentNode);});
  
  parent.appendChild(button);
}
function addRemoveButton(parent){
  var button = document.createElement('button')
  button.type = 'button';
  button.innerHTML = '<img src="ic_delete_black_24px.svg" alt="REMOVE">';
  button.classList.add('remove');
  button.addEventListener('click', function(){removeInput(this.parentNode);});
  parent.appendChild(button);
}
function generateMarkdown(){
  var md = '#Beacon Number: ' + document.getElementById('beacon').value + '<br>#Planet Name: ' + document.getElementById('planetName').value + '<br>#Star Name: ' + document.getElementById('starName').value + '<br>#Region: ' + document.getElementById('region').value + '<br>#Discoverer: ' + document.getElementById('discoverer').value + '<br><br>##Space Features: <br><br>';
  var arr = document.querySelectorAll('#spaceFeatures input');
  for (var i = 0; i < arr.length; i++){
    md += '* '+ arr[i].value +'<br>';
  }
  md += '<br>##Planet Features: <br><br>###Atmosphere: <br><br>'
  var arr = document.querySelectorAll('#atmosphere input');
  for (var i = 0; i < arr.length; i++){
    md += '* '+ arr[i].value +'<br>';
  }
  md += '<br>###General Description: <br><br>'
  var arr = document.querySelectorAll('#ground input');
  for (var i = 0; i < arr.length; i++){
    md += '* '+ arr[i].value +'<br>';
  }
  md += '<br>###Ground: <br>####Plants: <br><br>';
  var arr = document.querySelectorAll('#groundPlants .detail');
  for (var i = 0; i < arr.length; i++){
    if (arr[i].querySelector('.image').value)
      md += '**[' + arr[i].querySelector('.name').value + '](' + arr[i].querySelector('.image').value + ')**';
    else
      md += '**' + arr[i].querySelector('.name').value + '**';
    md += '<br><br>';
    var bullets = arr[i].querySelectorAll('.input input');
    for (var j = 0; j < bullets.length; j++){
      md += '* '+ bullets[j].value +'<br>';
    }
  }
  md += '<br>####Trees: <br><br>';
  var arr = document.querySelectorAll('#trees .detail');
  for (var i = 0; i < arr.length; i++){
    if (arr[i].querySelector('.image').value)
      md += '**[' + arr[i].querySelector('.name').value + '](' + arr[i].querySelector('.image').value + ')**';
    else
      md += '**' + arr[i].querySelector('.name').value + '**';
    md += '<br><br>';
    var bullets = arr[i].querySelectorAll('.input input');
    for (var j = 0; j < bullets.length; j++){
      md += '* '+ bullets[j].value +'<br>';
    }
  }
  md += '<br>####Ground Creatures: <br><br>';
  var arr = document.querySelectorAll('#groundAnimals .detail');
  for (var i = 0; i < arr.length; i++){
    if (arr[i].querySelector('.image').value)
      md += '**[' + arr[i].querySelector('.name').value + '](' + arr[i].querySelector('.image').value + ')**';
    else
      md += '**' + arr[i].querySelector('.name').value + '**';
    md += '<br><br>';
    var bullets = arr[i].querySelectorAll('.input input');
    for (var j = 0; j < bullets.length; j++){
      md += '* '+ bullets[j].value +'<br>';
    }
  }
  md += '<br>###Water: <br>####General Information: <br><br>'
  var arr = document.querySelectorAll('#water input');
  for (var i = 0; i < arr.length; i++){
    md += '* '+ arr[i].value +'<br>';
  }
  md += '<br>####Plants: <br><br>';
  var arr = document.querySelectorAll('#waterPlants .detail');
  for (var i = 0; i < arr.length; i++){
    if (arr[i].querySelector('.image').value)
      md += '**[' + arr[i].querySelector('.name').value + '](' + arr[i].querySelector('.image').value + ')**';
    else
      md += '**' + arr[i].querySelector('.name').value + '**';
    md += '<br><br>';
    var bullets = arr[i].querySelectorAll('.input input');
    for (var j = 0; j < bullets.length; j++){
      md += '* '+ bullets[j].value +'<br>';
    }
  }
  md += '<br>####Fish: <br><br>';
  var arr = document.querySelectorAll('#fish .detail');
  for (var i = 0; i < arr.length; i++){
    if (arr[i].querySelector('.image').value)
      md += '**[' + arr[i].querySelector('.name').value + '](' + arr[i].querySelector('.image').value + ')**';
    else
      md += '**' + arr[i].querySelector('.name').value + '**';
    md += '<br><br>';
    var bullets = arr[i].querySelectorAll('.input input');
    for (var j = 0; j < bullets.length; j++){
      md += '* '+ bullets[j].value +'<br>';
    }
  }
  return md;
}

function hideModal(){
  'use strict';
  var oldDetail = document.querySelector('#modalContainer');
  if (oldDetail){
    oldDetail.parentNode.removeChild(oldDetail);
  }
}

function showModal(text){
  'use strict';
  hideModal();
  
  var close = document.createElement('button');
  close.innerHTML = 'Close';
  close.type = 'button';
  close.addEventListener('click', hideModal);
  var quote = document.createElement('blockquote');
  quote.innerHTML = text;
  var help = document.createElement('p');
  help.innerHTML = 'The following text has been generated from the information provided. Something wrong? Submit an issue on <a href="https://github.com/SecretOnline/NMS-Report">GitHub</a>'
  var modal = document.createElement('div');
  modal.id = 'modal';
  modal.appendChild(close);
  modal.appendChild(help);
  modal.appendChild(quote);
  var modalContainer = document.createElement('div');
  modalContainer.id = 'modalContainer';
  modalContainer.appendChild(modal);
  document.querySelector('body').appendChild(modalContainer);
}

window.addEventListener('load', init);