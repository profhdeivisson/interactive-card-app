import { useState } from 'react';
import { useCard } from '../../context/CardContext';
import cardValidator from 'card-validator';

const Form = () => {
    const { setCardDetails, setConfirmed, cardDetails } = useCard();
    const [inputValues, setInputValues] = useState({
        name: '',
        number: '',
        expDate: '',
        cvc: '',
    });
    const [errors, setErrors] = useState({});

    // Função para obter o ano atual
    const getCurrentYear = () => new Date().getFullYear().toString().slice(-2); // Retorna os últimos 2 dígitos do ano

    // Função para validar o formulário
    const validateForm = () => {
        const newErrors = {};

        // Limpar o número do cartão (remover espaços e outros caracteres não numéricos)
        const sanitizedNumber = inputValues.number.replace(/\D/g, '');

        // Definir a quantidade de dígitos esperada com base no tipo de cartão
        let maxLength = 16; // Valor padrão para a maioria dos cartões

        // Ajustar a quantidade de dígitos esperada com base no tipo de cartão
        if (sanitizedNumber.startsWith('34') || sanitizedNumber.startsWith('37')) {
            maxLength = 15; // Amex
        } else if (sanitizedNumber.startsWith('36') || sanitizedNumber.startsWith('38')) {
            maxLength = 14; // Diners Club
        } // Você pode adicionar mais regras de acordo com outros tipos de cartões

        // Verificar se o número tem a quantidade correta de dígitos
        if (sanitizedNumber.length !== maxLength) {
            newErrors.number = `Card number must be ${maxLength} digits.`;
        }

        // Validar data de expiração
        const expDateValidation = cardValidator.expirationDate(inputValues.expDate);
        if (!expDateValidation.isValid) {
            newErrors.expDate = 'Invalid expiration date';
        }

        // Validar CVC
        const cvcValidation = cardValidator.cvv(inputValues.cvc);
        if (!cvcValidation.isValid) {
            newErrors.cvc = 'CVC must be 3 digits';
        }

        if (!inputValues.name) {
            newErrors.name = 'Name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'number') {
            let sanitizedNumber = value.replace(/\D/g, '');

            // Validar o número do cartão e detectar o tipo
            const cardValidation = cardValidator.number(sanitizedNumber);

            let maxLength = 16;
            if (cardValidation.card) {
                if (cardValidation.card.type === 'amex') {
                    maxLength = 15;
                } else if (cardValidation.card.type === 'dinersclub') {
                    maxLength = 14;
                } else if (cardValidation.card.type === 'elo') {
                    maxLength = 16;
                }
            }

            if (sanitizedNumber.length > maxLength) {
                sanitizedNumber = sanitizedNumber.slice(0, maxLength);
            }

            const formattedNumber = sanitizedNumber.replace(/(.{4})/g, '$1 ').trim();

            setInputValues((prevState) => ({
                ...prevState,
                [name]: formattedNumber,
            }));

            setCardDetails((prevState) => ({
                ...prevState,
                number: formattedNumber,
                cardType: cardValidation.card ? cardValidation.card.type : 'default',
            }));

            if (cardValidation.card) {
                setCardDetails((prevState) => ({
                    ...prevState,
                    cardType: cardValidation.card.type,
                }));
            } else {
                setCardDetails((prevState) => ({
                    ...prevState,
                    cardType: 'default',
                }));
            }
            return;
        }

        // Validação e formatação para expDate (MM/YY)
        if (name === 'expDate') {
            let formattedExpDate = value.replace(/\D/g, ''); // Remove caracteres não numéricos
            if (formattedExpDate.length >= 3) {
                formattedExpDate = formattedExpDate.slice(0, 2) + '/' + formattedExpDate.slice(2, 4);
            }

            // Validar o mês e o ano
            const [month, year] = formattedExpDate.split('/');
            const currentYear = getCurrentYear();

            if (month && parseInt(month) > 12) {
                setErrors((prevState) => ({
                    ...prevState,
                    expDate: 'Month cannot be greater than 12',
                }));
            } else if (year && parseInt(year) < parseInt(currentYear)) {
                setErrors((prevState) => ({
                    ...prevState,
                    expDate: 'Year cannot be less than the current year',
                }));
            } else {
                setErrors((prevState) => ({
                    ...prevState,
                    expDate: '',
                }));
            }

            setInputValues((prevState) => ({
                ...prevState,
                [name]: formattedExpDate,
            }));

            setCardDetails((prevState) => ({
                ...prevState,
                [name]: formattedExpDate,
            }));
            return;
        }

        // Validação do CVC (apenas números, máximo de 3 dígitos)
        if (name === 'cvc') {
            const sanitizedCVC = value.replace(/\D/g, ''); // Remove caracteres não numéricos

            if (sanitizedCVC.length > 3) {
                setErrors((prevState) => ({
                    ...prevState,
                    cvc: 'CVC must be 3 digits',
                }));
            } else {
                setErrors((prevState) => ({
                    ...prevState,
                    cvc: '',
                }));
            }

            setInputValues((prevState) => ({
                ...prevState,
                [name]: sanitizedCVC,
            }));

            setCardDetails((prevState) => ({
                ...prevState,
                [name]: sanitizedCVC,
            }));
            return;
        }

        setInputValues({
            ...inputValues,
            [name]: value,
        });

        setCardDetails({
            ...inputValues,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setConfirmed(true);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Cardholder Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={inputValues.name}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md text-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="e.g. Jane Appleseed"
                    maxLength="30"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
                <label htmlFor="number" className="block text-sm font-semibold text-gray-700">Card Number</label>
                <input
                    type="text"
                    id="number"
                    name="number"
                    value={inputValues.number}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md text-lg ${errors.number ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="e.g. 1234 5678 9123 0000"
                />
                {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
            </div>
            <div className="flex space-x-4">
                <div className="w-1/2">
                    <label htmlFor="expDate" className="block text-sm font-semibold text-gray-700">Exp. Date (MM/YY)</label>
                    <input
                        type="text"
                        id="expDate"
                        name="expDate"
                        value={inputValues.expDate}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-md text-lg ${errors.expDate ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="MM/YY"
                        maxLength="5"
                    />
                    {errors.expDate && <p className="text-red-500 text-sm">{errors.expDate}</p>}
                </div>
                <div className="w-1/2">
                    <label htmlFor="cvc" className="block text-sm font-semibold text-gray-700">CVC</label>
                    <input
                        type="text"
                        id="cvc"
                        name="cvc"
                        value={inputValues.cvc}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-md text-lg ${errors.cvc ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="e.g. 123"
                        maxLength="3"
                    />
                    {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc}</p>}
                </div>
            </div>
            <button type="submit" className="w-full bg-purple-700 text-white py-3 rounded-md mt-6 text-lg font-semibold">
                Confirm
            </button>
        </form>
    );
};

export default Form;
