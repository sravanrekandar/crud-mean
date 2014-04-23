$(function(){
    'use strict';
    // Navbar
    $('body').on('click', '#navbar-nav li', function(){
        $('#navbar-nav .active').removeClass('active');
        $(this).addClass('active');
    });
});