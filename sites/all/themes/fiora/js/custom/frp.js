function gjCountAndRedirect(secounds) {

    $('#gj-counter-num').text(secounds);
    $('#gj-counter-box').show();

    var interval = setInterval(function() {
        secounds = secounds - 1;
        $('#gj-counter-num').text(secounds);

        if (secounds == 0) {
            clearInterval(interval);
            $('#gj-counter-box').hide();
            window.location.replace("/force-page-refresh");
        }
    }, 1000);

}
