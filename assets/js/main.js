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

    //search form 
    const countries = [
        { name: 'China', flagSrc: 'https://cdn.airalo.com/images/301616a0-cd3e-4151-a4ec-78c8ddb04ca9.png' },
        { name: 'VietNam', flagSrc: 'https://cdn.airalo.com/images/801dd2cd-d1de-45a3-9869-c6d453145f38.png' },
        { name: 'VietNam1', flagSrc: 'https://cdn.airalo.com/images/801dd2cd-d1de-45a3-9869-c6d453145f38.png' },
        { name: 'VietNam2', flagSrc: 'https://cdn.airalo.com/images/801dd2cd-d1de-45a3-9869-c6d453145f38.png' },
        { name: 'VietNam3', flagSrc: 'https://cdn.airalo.com/images/801dd2cd-d1de-45a3-9869-c6d453145f38.png' },
        { name: 'VietNam4', flagSrc: 'https://cdn.airalo.com/images/801dd2cd-d1de-45a3-9869-c6d453145f38.png' }
    ];

    const searchInput = document.getElementById("search");
    const searchContainer = document.querySelector(".search-container");

    searchInput.addEventListener("input", function() {
        const inputValue = this.value.trim();

        if (inputValue === "") {
            clearSearchResults();
            removeClearCloseButton();
        } else {
            if (!searchContainer.querySelector(".clear-close")) {
                createClearCloseButton();
            }
        }

        if (inputValue.length >= 2) {
            changeInput(inputValue);
        } else {
            clearSearchResults();
        }
    });

    function createClearCloseButton() {
        const clearCloseButton = document.createElement("button");
        clearCloseButton.className = "clear-close";
        clearCloseButton.addEventListener("click", function() {
            searchInput.value = "";
            clearSearchResults();
            removeClearCloseButton();
        });
        searchContainer.appendChild(clearCloseButton);
    }

    function removeClearCloseButton() {
        const clearCloseButton = searchContainer.querySelector(".clear-close");
        if (clearCloseButton) {
            searchContainer.removeChild(clearCloseButton);
        }
    }

    function clearSearchResults() {
        const searchResults = searchContainer.querySelector(".search-results");
        if (searchResults) {
            searchResults.innerHTML = ""
            searchResults.style.display = "none";
        }
    }

    function matchCountry(input) {
        const reg = new RegExp(input.replace(/\W/, ""), "i");
        return input.trim().length === 0 ? [] : countries.filter(country => country.name.match(reg));
    }

    function changeInput(val) {
        const autoCompleteResult = matchCountry(val);
        let searchResults = searchContainer.querySelector(".search-results");

        if (!searchResults) {
            searchResults = document.createElement("ul");
            searchResults.className = "list-group search-results";
            searchContainer.appendChild(searchResults);
        }

        if (autoCompleteResult.length === 0) {
            searchResults.style.display = "none"; 
            return; // Thoát khỏi hàm
        }

        searchResults.innerHTML = ""; 
        searchResults.style.display = "block"; 

        for (let i = 0; i < Math.min(autoCompleteResult.length, 10); i++) {
            const countryName = autoCompleteResult[i].name;
            const flagSrc = autoCompleteResult[i].flagSrc;
            const liElement = document.createElement("li");
            const aElement = document.createElement("a");
            const spanElement = document.createElement("span");
            const imgElement = document.createElement("img");

            spanElement.textContent = countryName;
            spanElement.className = "country-name";
            imgElement.src = flagSrc;
            imgElement.className = "country-flag";

            aElement.href = "#";
            aElement.appendChild(spanElement);
            aElement.appendChild(imgElement);
           
            aElement.addEventListener("click", function(event) {
                event.preventDefault(); 
                setSearch(countryName); 
            });

            liElement.appendChild(aElement);
            searchResults.appendChild(liElement);
        }
    }

    function setSearch(value) {
        searchInput.value = value;
        clearSearchResults();
    }

    //popup all country
    $('.item-show-all').click(function(e) {
        e.preventDefault();
        $('.supported-countries-modal').addClass('active');
    });

    document.getElementById("search-coverage").addEventListener("input", function() {
        var searchValue = this.value.toLowerCase();
        var countries = document.querySelectorAll(".list-countries .name");

        countries.forEach(function(country) {
            var text = country.textContent.toLowerCase();
            var listItem = country.parentElement;

            if (text.includes(searchValue)) {
                listItem.style.display = "flex";
            } else {
                listItem.style.display = "none";
            }
        });
    });
    // popup select package
    $('.select-package').click(function(e) {
        e.preventDefault();
        $('.select-package-modal').addClass('active');
    });
});
