(function() {
  'use strict';

  function init() {
    var arr = document.querySelectorAll('.inputContainer');
    var i;
    for (i = 0; i < arr.length; i++)
      addAddButton(arr[i]);
    arr = document.querySelectorAll('.detailContainer');
    for (i = 0; i < arr.length; i++)
      addAddButton(arr[i]);
    var button = document.getElementById('genMD');
    button.addEventListener('click', function() {
      showModal(generateMarkdown());
    });
    button = document.getElementById('genJSON');
    button.addEventListener('click', function() {
      showModal(generateJSON());
    });
    button = document.getElementById('importJSON');
    button.addEventListener('click', function() {
      importJSON();
    });
  }

  function addInput(parent) {
    var newEl = document.createElement('p');
    newEl.classList.add('input');
    newEl.innerHTML = '<input type="text">';
    addRemoveButton(newEl);
    parent.appendChild(newEl);
  }

  function addDetail(parent, inner) {
    var newEl = document.createElement('p');
    if (inner)
      newEl.innerHTML = inner;
    else
      newEl.innerHTML = 'Name: <input type="text" class="name"><br>Image URL <em>(Optional)</em>: <input type="text" class="image"><br>Bullets: ';
    newEl.classList.add('detail');
    newEl.classList.add('inputContainer');
    addAddButton(newEl);
    addRemoveButton(newEl);
    addInput(newEl);
    parent.appendChild(newEl);
  }

  function addAnimal(parent) {
    addDetail(parent, 'Name: <input type="text" class="name"><br>Image URL <em>(Optional)</em>: <input type="text" class="image"><br>Number of Legs: <input type="number" class="legs"><br>Bullets: ');
  }

  function addPlant(parent) {
    addDetail(parent, 'Name: <input type="text" class="name"><br>Image URL <em>(Optional)</em>: <input type="text" class="image"><br>Foliage Color: <input type="text" class="color"><br>Bullets: ');
  }

  function addTree(parent) {
    addDetail(parent, 'Name: <input type="text" class="name"><br>Image URL <em>(Optional)</em>: <input type="text" class="image"><br>Bark Color: <input type="text" class="bark"><br>Foliage Color: <input type="text" class="color"><br>Bullets: ');
  }

  function addAddButton(parent) {
    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = '<img src="ic_add_black_24px.svg" alt="ADD">';
    button.classList.add('add');
    if (parent.id === 'groundAnimals')
      button.addEventListener('click', function() {
        addAnimal(this.parentNode);
      });
    else if (parent.id === 'groundPlants' || parent.id === 'waterPlants')
      button.addEventListener('click', function() {
        addPlant(this.parentNode);
      });
    else if (parent.id === 'trees')
      button.addEventListener('click', function() {
        addTree(this.parentNode);
      });
    else if (parent.classList.contains('inputContainer'))
      button.addEventListener('click', function() {
        addInput(this.parentNode);
      });
    else if (parent.classList.contains('detailContainer'))
      button.addEventListener('click', function() {
        addDetail(this.parentNode);
      });
    else {
      showModal('Uh Oh.<br>Something went wrong trying to add a button to ' + parent.id + '. Please report this issue on <a href="https://github.com/SecretOnline/NMS-Report">GitHub</a>.');
      return;
    }
    parent.appendChild(button);
  }

  function addRemoveButton(parent) {
    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = '<img src="ic_delete_black_24px.svg" alt="REMOVE">';
    button.classList.add('remove');
    button.addEventListener('click', function() {
      this.parentNode.parentNode.removeChild(this.parentNode);
    });
    parent.appendChild(button);
  }

  function toObj() {
    var i, j, arr, bullets;
    var obj = {};
    obj._v = '1.2'; // JSON Version, in case structure changes later
    obj.beacon = document.getElementById('beacon').value;
    obj.planet = document.getElementById('planetName').value;
    obj.star = document.getElementById('starName').value;
    obj.region = document.getElementById('region').value;
    obj.discoverer = document.getElementById('discoverer').value;
    obj.general = {};
    obj.general.space = [];
    arr = document.querySelectorAll('#spaceFeatures input');
    for (i = 0; i < arr.length; i++)
      obj.general.space[i] = arr[i].value;
    obj.general.atmosphere = [];
    arr = document.querySelectorAll('#atmosphere input');
    for (i = 0; i < arr.length; i++)
      obj.general.atmosphere[i] = arr[i].value;
    obj.general.minerals = [];
    arr = document.querySelectorAll('#minerals input');
    for (i = 0; i < arr.length; i++)
      obj.general.minerals[i] = arr[i].value;
    obj.general.ground = [];
    arr = document.querySelectorAll('#ground input');
    for (i = 0; i < arr.length; i++)
      obj.general.ground[i] = arr[i].value;
    obj.general.aquatic = [];
    arr = document.querySelectorAll('#water input');
    for (i = 0; i < arr.length; i++)
      obj.general.aquatic[i] = arr[i].value;
    obj.plants = {};
    obj.plants.ground = [];
    arr = document.querySelectorAll('#groundPlants .detail');
    for (i = 0; i < arr.length; i++) {
      obj.plants.ground[i] = {};
      obj.plants.ground[i].name = arr[i].querySelector('.name').value;
      obj.plants.ground[i].image = arr[i].querySelector('.image').value;
      obj.plants.ground[i].color = arr[i].querySelector('.color').value;
      obj.plants.ground[i].general = [];
      bullets = arr[i].querySelectorAll('.input input');
      for (j = 0; j < bullets.length; j++)
        obj.plants.ground[i].general[j] = bullets[j].value;
    }
    obj.plants.trees = [];
    arr = document.querySelectorAll('#trees .detail');
    for (i = 0; i < arr.length; i++) {
      obj.plants.trees[i] = {};
      obj.plants.trees[i].name = arr[i].querySelector('.name').value;
      obj.plants.trees[i].image = arr[i].querySelector('.image').value;
      obj.plants.trees[i].bark = arr[i].querySelector('.bark').value;
      obj.plants.trees[i].color = arr[i].querySelector('.color').value;
      obj.plants.trees[i].general = [];
      bullets = arr[i].querySelectorAll('.input input');
      for (j = 0; j < bullets.length; j++)
        obj.plants.trees[i].general[j] = bullets[j].value;
    }
    obj.plants.aquatic = [];
    arr = document.querySelectorAll('#waterPlants .detail');
    for (i = 0; i < arr.length; i++) {
      obj.plants.aquatic[i] = {};
      obj.plants.aquatic[i].name = arr[i].querySelector('.name').value;
      obj.plants.aquatic[i].image = arr[i].querySelector('.image').value;
      obj.plants.aquatic[i].color = arr[i].querySelector('.color').value;
      obj.plants.aquatic[i].general = [];
      bullets = arr[i].querySelectorAll('.input input');
      for (j = 0; j < bullets.length; j++)
        obj.plants.aquatic[i].general[j] = bullets[j].value;
    }
    obj.animals = {};
    obj.animals.ground = [];
    arr = document.querySelectorAll('#groundAnimals .detail');
    for (i = 0; i < arr.length; i++) {
      obj.animals.ground[i] = {};
      obj.animals.ground[i].name = arr[i].querySelector('.name').value;
      obj.animals.ground[i].image = arr[i].querySelector('.image').value;
      obj.animals.ground[i].legs = arr[i].querySelector('.legs').value;
      obj.animals.ground[i].general = [];
      bullets = arr[i].querySelectorAll('.input input');
      for (j = 0; j < bullets.length; j++)
        obj.animals.ground[i].general[j] = bullets[j].value;
    }
    obj.animals.aquatic = [];
    arr = document.querySelectorAll('#waterAnimals .detail');
    for (i = 0; i < arr.length; i++) {
      obj.animals.aquatic[i] = {};
      obj.animals.aquatic[i].name = arr[i].querySelector('.name').value;
      obj.animals.aquatic[i].image = arr[i].querySelector('.image').value;
      obj.animals.aquatic[i].general = [];
      bullets = arr[i].querySelectorAll('.input input');
      for (j = 0; j < bullets.length; j++)
        obj.animals.aquatic[i].general[j] = bullets[j].value;
    }
    return obj;
  }

  function generateJSON() {
    return JSON.stringify(toObj());
  }

  function generateMarkdown() {
    var md = "";
    var obj = toObj();

    // Add basic stats
    if (obj.beacon) {
      md += '#Beacon Number: ' + obj.beacon + '<br>';
    }
    if (obj.planet) {
      md += '#Planet Name: ' + obj.planet + '<br>';
    }
    if (obj.star) {
      md += '#Star Name: ' + obj.star + '<br>';
    }
    if (obj.region) {
      md += '#Region: ' + obj.region + '<br>';
    }
    if (obj.discoverer) {
      md += '#Discoverer: ' + obj.discoverer + '<br>';
    }
    // Add some spacing if there were headers
    if (md !== "") {
      md += '<br><br>';
    }
    // Space features
    if (obj.general.space.length) {
      md += '##Space Features: <br><br>';
      obj.general.space.forEach(function(item) {
        md += '* ' + item + '<br>';
      });
    }
    // If any planet features have items
    if (obj.general.atmosphere.length ||
      obj.general.ground.length ||
      obj.general.minerals.length ||
      obj.general.aquatic.length ||
      obj.plants.ground.length ||
      obj.plants.trees.length ||
      obj.plants.aquatic.length ||
      obj.animals.ground.length ||
      obj.animals.aquatic.length) {
      // Add planet features heading
      md += '##Planet Features: <br><br>';

      // Add atmospheric features
      if (obj.general.atmosphere.length) {
        md += '###Atmosphere: <br><br>';
        obj.general.atmosphere.forEach(function(item) {
          md += '* ' + item + '<br>';
        });
        md += '<br>';
      }

      // Check for ground items
      if (obj.general.ground.length ||
        obj.general.minerals.length ||
        obj.plants.ground.length ||
        obj.plants.trees.length ||
        obj.animals.ground.length) {
        // Add ground headiong
        md += '###Ground:<br><br>';
        // Ground
        if (obj.general.ground.length) {
          md += '###General Description: <br><br>';
          obj.general.ground.forEach(function(item) {
            md += '* ' + item + '<br>';
          });
          md += '<br>';
        }
        // Minerals
        if (obj.general.minerals.length) {
          md += '###Minerals: <br><br>';
          obj.general.minerals.forEach(function(item) {
            md += '* ' + item + '<br>';
          });
          md += '<br>';
        }
        // Plants
        if (obj.plants.ground.length) {
          md += '####Plants: <br><br>';
          obj.plants.ground.forEach(function(item) {
            if (item.image) {
              md += '#####[' + item.name + '](' + item.image + ')<br>';
            } else {
              md += '#####' + item.name + '<br>';
            }
            md += '**Foliage Color:** ' + item.color + '<br><br>';
            if (item.general.length) {
              item.general.forEach(function(bullet) {
                md += '* ' + bullet + '<br><br>';
              });
            }
          });
          md += '<br>';
        }
        // Trees
        if (obj.plants.trees.length) {
          md += '####Trees: <br><br>';
          obj.plants.trees.forEach(function(item) {
            if (item.image) {
              md += '#####[' + item.name + '](' + item.image + ')<br>';
            } else {
              md += '#####' + item.name + '<br>';
            }
            md += '**Bark Color:** ' + item.bark + '<br><br>';
            md += '**Foliage Color:** ' + item.color + '<br><br>';
            if (item.general.length) {
              item.general.forEach(function(bullet) {
                md += '* ' + bullet + '<br><br>';
              });
            }
          });
          md += '<br>';
        }
        // Creatures
        if (obj.animals.ground.length) {
          md += '####Ground Creatures: <br><br>';
          obj.animals.ground.forEach(function(item) {
            if (item.image) {
              md += '#####[' + item.name + '](' + item.image + ')<br>';
            } else {
              md += '#####' + item.name + '<br>';
            }
            md += '**Number of Legs:** ' + item.legs + '<br><br>';
            if (item.general.length) {
              item.general.forEach(function(bullet) {
                md += '* ' + bullet + '<br><br>';
              });
            }
          });
          md += '<br>';
        }
        md += '<br>';
      }

      // Check for aquatic
      if (obj.general.aquatic.length ||
        obj.plants.aquatic.length ||
        obj.animals.aquatic.length) {
        // Add ground headiong
        md += '###Water:<br><br>';
        // Ground
        if (obj.general.aquatic.length) {
          md += '###General Description: <br><br>';
          obj.general.aquatic.forEach(function(item) {
            md += '* ' + item + '<br>';
          });
          md += '<br>';
        }
        // Plants
        if (obj.plants.aquatic.length) {
          md += '####Plants: <br><br>';
          obj.plants.aquatic.forEach(function(item) {
            if (item.image) {
              md += '#####[' + item.name + '](' + item.image + ')<br>';
            } else {
              md += '#####' + item.name + '<br>';
            }
            md += '**Foliage Color:** ' + item.color + '<br><br>';
            if (item.general.length) {
              item.general.forEach(function(bullet) {
                md += '* ' + bullet + '<br><br>';
              });
            }
          });
          md += '<br>';
        }
        // Creatures
        if (obj.animals.aquatic.length) {
          md += '####Ground Creatures: <br><br>';
          obj.animals.aquatic.forEach(function(item) {
            if (item.image) {
              md += '#####[' + item.name + '](' + item.image + ')<br>';
            } else {
              md += '#####' + item.name + '<br>';
            }
            if (item.general.length) {
              item.general.forEach(function(bullet) {
                md += '* ' + bullet + '<br><br>';
              });
            }
          });
          md += '<br>';
        }
        md += '<br>';
      }
    }
    return md;
  }

  function hideModal() {
    var oldDetail = document.querySelector('#modalContainer');
    if (oldDetail) {
      oldDetail.parentNode.removeChild(oldDetail);
    }
  }

  function showModal(text) {
    hideModal();

    var close = document.createElement('button');
    close.innerHTML = 'Close';
    close.type = 'button';
    close.id = 'close';
    close.addEventListener('click', hideModal);
    var quote = document.createElement('blockquote');
    quote.innerHTML = text;
    var help = document.createElement('p');
    help.innerHTML = 'Something wrong? Submit an issue on <a href="https://github.com/SecretOnline/NMS-Report">GitHub</a>';
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

  function importJSON() {
    showModal("Unfortunately, JSON importing is not yet available. It should be here Soon<sup>tm</sup>, just like No Man's Sky itself... :(");
  }

  if (document.readyState !== 'loading')
    init();
  else
    window.addEventListener('DOMContentLoaded', init);

}());
