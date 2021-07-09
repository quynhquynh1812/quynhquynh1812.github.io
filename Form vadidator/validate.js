
//Đối tượng 'Validator'
function Validator(options) {

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    let selectorRules = {};

    //Hàm thực hiện validate
    function validate(inputElement, rule) {
        let errorMessage = rule.test(inputElement.value);
        let errorElement = getParent(inputElement, options.fornGroupSelector).querySelector(options.errorSelector);

        //Lấy ra các rules của selector
        let rules = selectorRules[rule.selector];

        //Lặp qua từng rules và kiểm tra
        //Nếu có lỗi thì dừng việc kiểm tra
        for (var i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.fornGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.fornGroupSelector).classList.remove('invalid');
        }
        return !errorMessage;
    }

    //Lấy element của form cần validate
    let formElement = document.querySelector(options.form);

    if (formElement) {

        //Xử lý lặp qua mỗi rules và xử lý (lắng nghe sự kiện blur,...)
        formElement.onsubmit = function (e) {
            e.preventDefault();

            let isFormValid = true;
            //Thực hiện lặp qua từng rule và validate
            options.rules.forEach(function (rule) {
                let inputElement = formElement.querySelector(rule.selector);
                let isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });



            if (isFormValid) {
                //Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {

                    let enableInputs = formElement.querySelectorAll('[name]');
                    let formValue = Array.from(enableInputs).reduce(function (values, input) {
                        values[input.name] = input.value;
                        return values;
                    }, {});

                    options.onSubmit(formValue)
                }
                //Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }
        }

        options.rules.forEach(function (rule) {

            //Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            let inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {

            });

            if (inputElement) {
                //Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                //Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    let errorElement = getParent(inputElement, options.fornGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.fornGroupSelector).classList.remove('invalid');
                }
            }
        });

    }
}


//Định nghĩa rules
//Nguyên tắc của các rules:
//1. Khi có lỗi => trả ra Message lỗi
//2. Khi hợp lệ => k trả ra cái gì (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector,
        test: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường này!'
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector,
        test: function (value) {
            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : message || 'Trường này là email!'
        }
    }
}

Validator.minLength = function (selector, min, message) {
    return {
        selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự!`;
        }
    }
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác!';
        }
    }
}



