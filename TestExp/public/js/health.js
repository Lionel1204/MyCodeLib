$(document).ready(
  $.get('/health', function(data){

    console.log(data.version);
    $('#health-info').text('Version: ' + data.version)
  })
)