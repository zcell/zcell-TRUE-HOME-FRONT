export default ({store}, inject) => {

    inject('numberFormat', (val, options) => {
        return new Intl.NumberFormat('ru-RU', {maximumFractionDigits: 2, minimumFractionDigits: 2,}).format(parseFloat(val));

    })
};