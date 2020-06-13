export default {
    data() {
        return {
            getDate: new Date(),
            time1: '',
            time2: '',
            time3: '',
            // custom lang
            lang: {
                days: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
                placeholder: {
                    date: 'Select Date',
                    dateRange: 'Select Date Range'
                }
            },
            // custom range shortcuts
            shortcuts: [
                {
                    text: 'Today',
                    onClick: () => {
                        this.time3 = [ new Date(), new Date() ]
                    }
                }
            ],
            timePickerOptions:{
                start: '00:00',
                step: '00:30',
                end: '23:30'
            }
        }
    },
}