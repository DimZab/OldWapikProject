const menu = document.getElementById('header_menu');
const items = menu.getElementsByClassName('navbar_menu_item');
const header = document.getElementById('header');
const hamburger = document.getElementById('ham');

function redrawMenu() {
    showAll();
    hideUnnecessary();
}

function showAll() {
    let j;
    for (j = 0; j < items.length; ++j) {
        items[j].style.display = 'block';
    }
}

function hideUnnecessary() {
    if (header.clientWidth < 1000) {
        items[items.length - 1].style.display = 'none';
        hamburger.style.visibility = 'visible';
    } else {
        hamburger.style.visibility = 'hidden';
    }
    if (header.clientWidth  < 900) {
        items[items.length - 2].style.display = 'none';
    }
    if (header.clientWidth  < 800) {
        items[items.length - 3].style.display = 'none';
    }
    if (header.clientWidth  < 700) {
        items[items.length - 4].style.display = 'none';
    }
    if (header.clientWidth  < 600) {
        items[items.length - 5].style.display = 'none';
    }
    if (header.clientWidth  < 500) {
        items[items.length - 6].style.display = 'none';
    }
}

redrawMenu();

var hamburgerAction = new function() {
    const hamPopup = document.getElementById('popup');
    const headerPopup = document.getElementById('header_popup');
    const popupItems = headerPopup.getElementsByClassName('popup_item');
    let isOpen = false;
    let i;

    function clear() {
        for (i = 0; i < popupItems.length; ++i) {
            popupItems[i].style.display = 'none';
        }
    }

    function open() {
        clear();
        for (i = 0; i < items.length; ++i) {
            if (items[i].style.display == 'none') {
                popupItems[i].style.display = 'block';
            }
        }
        headerPopup.style.visibility = 'visible';
        headerPopup.style.opacity = 1;
    }

    function close() {
        headerPopup.style.visibility = 'hidden';
        headerPopup.style.opacity = 0;
    }

    function click() {
        isOpen ? close() : open();
        isOpen = !isOpen;
    }

    return {
        click : click,
        isOpen: isOpen,
        close: close
    }
};

hamburger.addEventListener('click', hamburgerAction.click);



var slideIndex = 1;
  showSlides (slideIndex);

function plusSlides(n) {
  showSlides (slideIndex += n);
}

function currentSlide(n) {
  showSlides (slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if(n < 1){
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active ", "");
  }
  
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += "active";
}



const callback = document.getElementById('callback_btn');

const callbackAction = new function() {
    const popup = document.getElementById('popup');

    const nameField = document.getElementById('yourname');
    const phoneField = document.getElementById('yournumber');
    const adressField = document.getElementById('youradress');
    const submit = document.getElementById('popup_btn');
    const infoBlock = document.getElementById('footer_info');

    function open() {
        nameField.value = '';
        phoneField.value = '';
        adressField.value = '';
        popup.style.visibility = 'visible';
        popup.style.opacity = 1;
    }

    function close() {
        popup.style.visibility = 'hidden';
        popup.style.opacity = 0;
    }

    function send(userInfo) {
        close();
    }

    submit.addEventListener('click', function() {
        const nameRegEp = /^[a-zA-Z]{2,30}$/;
        const phoneRegExp = /^[0-9]{7,16}$/;
        const adressRegExp = /\S+@\S+\.\S+/;
        let isBreak = false;
        const userInfo = {
            name: nameField.value,
            phone: phoneField.value,
            adress: adressField.value
        }
        nameField.style.borderColor = '#green';
        phoneField.style.borderColor = '#green';
        adressField.style.borderColor = '#green';
        
        if (nameField.value === '' || !nameField.value.match(nameRegEp)) {
            nameField.style.borderColor = '#eb4f4e';
            isBreak = true;
        }
        if (phoneField.value === '' || !phoneField.value.match(phoneRegExp)) {
            phoneField.style.borderColor = '#eb4f4e';
            isBreak = true;
        }
        if (adressField.value === '' || !adressField.value.match(adressRegExp)) {
            adressField.style.borderColor = '#eb4f4e';
            isBreak = true;
        }
        if (isBreak) {
            return;
        }

        send(userInfo);
    });

    return {
        open : open,
        close: close,
        nameField: nameField.value,
        phoneField: phoneField.value,
        adressField: adressField.value
    }
};

callback.addEventListener('click', callbackAction.open);



