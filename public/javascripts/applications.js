$(document).ready(function () {
  $('.file-input').change(function () {
    $file = $(this).val();
    $file = $file.replace(/.*[\/\\]/, ''); //grab only the file name not the path
    $('.filename-container').append("<span  class='filename'>" + $file + "</span>").show();
  })
})
