import * as yup from 'yup';
export default function start() {
    const schema = yup.object().shape({
        firstName: yup.string().required('Поле "Имя" обязательно для заполнения'),
        lastName: yup.string().required('Поле "Фамилия" обязательно для заполнения'),
        email: yup.string().email('Некорректный адрес электронной почты').required('Поле "Почта" обязательно для заполнения'),
        phone: yup.string().matches(/^\+\d{10}$/, 'Некорректный номер телефона').required('Поле "Номер телефона" обязательно для заполнения'),
        message: yup.string().required('Поле "Поле ввода текста" обязательно для заполнения')
    });
    
    const form = document.getElementById('myForm');
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
    
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
    
        try {
            await schema.validate(data, { abortEarly: false });
            // Отправка данных формы, если они прошли валидацию
        } catch (error) {
            error.inner.forEach(err => {
                const inputField = document.getElementById(err.path);
                inputField.setCustomValidity(err.message);
                inputField.reportValidity();
            });
        }
    });
}