$(document).ready(function ()
{
    $('.selectWindow div').click(function(e)
    {
        $(this).parent().children('div').children('h3').css("color", "black");
        $(this).children('h3').css("color", "indianred");
        var selectedWindow = $(this).children('h3').attr('id');

        if(selectedWindow == 'esp')
        {
            $('#es').show();
            $('#en').hide();
        }
        else if(selectedWindow == 'eng')
        {
            $('#en').show();
            $('#es').hide();
        }
    });


});