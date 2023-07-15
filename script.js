
$(document).ready(function() {
  setInterval(function() {
    var updatedDate = dayjs().format('DD-MMM-YYYY HH:mm:ss');
    $('#currentDay').text(updatedDate);

    var currentHour = dayjs().hour();
    $('.row.time-block').each(function() {
      var hourId = parseInt($(this).attr('id').split('-')[1]);

      $(this).removeClass('past present future');
      if (hourId < currentHour) {
        $(this).addClass('past');
      } else if (hourId === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });
  }, 1000);

  $('.row.time-block').each(function() {
    var hourId = parseInt($(this).attr('id').split('-')[1]);
    var scheduleData = localStorage.getItem('schedule-' + hourId);

    if (scheduleData) {
      $(this).find('.description').val(scheduleData);
    }
  });

  $('.time-block .saveBtn').click(function() {
    var row = $(this).closest('.row.time-block');
    var hourId = parseInt(row.attr('id').split('-')[1]);
    var newText = row.find('.description').val();

    row.find('.description').text(newText);
    saveAgendaData(hourId, newText);
  });

  function saveAgendaData(hourId, text) {
    localStorage.setItem('schedule-' + hourId, text);
  }
});
