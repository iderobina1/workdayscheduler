currentDay = document.getElementById('currentDay');
currentDay.textContent = dayjs().format('dddd, MMMM D');

container = document.querySelector('.container-lg');

function sunMoon(hour) {
  amPm = 'AM';
  if (hour > 12) {
    hour -= 12;
    amPm = 'PM';
  }
  return hour + amPm;
}

for (let hour = 9; hour <= 17; hour++) {

  div = document.createElement('div');
  div.classList.add('row', 'time-block');

  time = document.createElement('div');
  time.classList.add('col-2', 'col-md-1', 'hour', 'text-center', 'py-3');
  time.textContent = sunMoon(hour);

  textarea = document.createElement('textarea');
  textarea.classList.add('col-8', 'col-md-10', 'description');
  textarea.setAttribute('rows', 3);

  button = document.createElement('button');
  button.classList.add('btn', 'saveBtn', 'col-2', 'col-md-1');
  button.setAttribute('aria-label', 'save');

  icon = document.createElement('i');
  icon.classList.add('fas', 'fa-save');
  icon.setAttribute('aria-hidden', true);

  button.appendChild(icon);

  div.appendChild(time);
  div.appendChild(textarea);
  div.appendChild(button);

  container.appendChild(div);

}

function colorCode() {

  hours = document.querySelectorAll('.time-block');

  hours.forEach(hour => {

    id = hour.id;
    hourInt = parseInt(id.split('-')[1]);

    now = dayjs().hour();

    if (hourInt < now) {
      hour.classList.add('past');
    } else if (hourInt === now) {
      hour.classList.add('present'); 
    } else {
      hour.classList.add('future');
    }

  });

}

// Color code on load
colorCode();

// Save events
saveBtns = document.querySelectorAll('.saveBtn');

saveBtns.forEach(btn => {

  btn.addEventListener('click', function(e) {

    timeblock = e.target.parentElement;
    id = timeblock.id;
    text = timeblock.querySelector('.description').value;

    localStorage.setItem(id, text);

  });

});

// Load saved events
document.addEventListener('DOMContentLoaded', function() {

  timeblocks = document.querySelectorAll('.time-block');

  timeblocks.forEach(block => {

    id = block.id;
    text = localStorage.getItem(id);

    if (text) {
      block.querySelector('.description').value = text;
    }

  });

});