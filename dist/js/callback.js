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
