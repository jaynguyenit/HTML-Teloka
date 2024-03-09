jQuery(document).ready(function($) {
    // slider
    $('.one-block-slider').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        items:1,
    });
    $('.main-related').owlCarousel({
        loop:true,
        margin:30,
        nav:false,
        responsive : {
            0 : {
               items:1,
            },
            769 : {
                items:3,
            }
        }
    });
    $('.related-product-detail').owlCarousel({
        loop:true,
        margin:30,
        nav:false,
        loop:true,
        responsive : {
            0 : {
               items:1,
            },
            769 : {
                items:2,
                center: true,
            }
        }
    });
    
    $('.main-slider-img').owlCarousel({
        margin:30,
        nav:false,
        responsive : {
            0 : {
               items:1,
               loop:true,
            },
            769 : {
                items:4,
                center: true,
                loop:false,
            }
        }
    });
    
    //tab
    $(".tab-info button").click(function(){
        var index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $(this).closest('.tab-esims').find(".tabcontent").eq(index).show().siblings('.tabcontent').hide();
    });
    $(".tab-info button:first-child").click();

    //footer 768
    var linkTitles = document.querySelectorAll('.linkTitle');
    linkTitles.forEach(function(linkTitle) {
        linkTitle.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                var footerBlocks = document.querySelectorAll('.footer-block');
                footerBlocks.forEach(function(footerBlock) {
                    if (footerBlock !== linkTitle.parentNode) {
                        footerBlock.classList.remove('active');
                    }
                });
                linkTitle.parentNode.classList.toggle('active');
            }
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            var footerBlocks = document.querySelectorAll('.footer-block');
            footerBlocks.forEach(function(footerBlock) {
                footerBlock.classList.remove('active');
            });
        }
    });

    // Popup
    $('.close').on('click', function(){
        $('.popup,#credit-card').removeClass('active');
    });
    //
    $('.btn-check-data').on('click', function(){
        $(this).closest('.main-data-esims').remove();
        $('.main-data-esims-checked').addClass('active');
    });
    

    //checkbox agreement list
    $('.custom-checkbox').each(function() {
        var input = $(this).find('.custom-control-input');
        $(this).click(function() {
            input.prop('checked', !input.prop('checked'));
        });
    });
    // input form
    $('.field.field--text input,.field.field--text-area textarea').on('focusout',function() {
        if($(this).val() != ''){
            $(this).parent().addClass('text-filled');
        }else{
            $(this).parent().removeClass('text-filled');
        }
    });
    $('.field.field--text input').each(function() {
        if($(this).val() != ''){
            $(this).parent().addClass('text-filled');
        }
    });
    $('.field.field--text-area textarea').each(function() {
        if($(this).val() != ''){
            $(this).parent().addClass('text-filled');
        }
    });

    //credit-card 
    $("#credit-card").click(function(){
        $(this).toggleClass('active');
        $('.credit-card').toggleClass('active');
    });
    //scroll search fixed
    $(window).scroll(function() {
        var scroll = $(this).scrollTop();
        var mainForm = $('.main-form');

        if (mainForm.length > 0) {
            var mainFormTop = mainForm.offset().top;
            var mainFormBottom = mainFormTop + mainForm.outerHeight();
            var windowHeight = $(window).height();
            if (scroll > mainFormBottom - windowHeight) {
                mainForm.addClass('active');
            } else {
                mainForm.removeClass('active');
            }
            if (scroll < mainFormTop) {
                mainForm.removeClass('active');
            }
        }
    });

    
});
