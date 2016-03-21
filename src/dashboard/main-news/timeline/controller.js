'use strict';

export default class TimelineCtrl {
    constructor($state, moment) {

        this.state = $state;
        this.daysAmountInCurrentMonth = moment().daysInMonth();
        this.allDays = Array.from(new Array(this.daysAmountInCurrentMonth), (x, i) => i + 1).reverse();
        const temp = this.daysWithNews.map(date => {
            const day = moment(date).date();
            return {
                name: day,
                id: day
            };
        });
        this.timelineDays = [];
        this.allDays.forEach((dayNumber) => {
            var t = temp.find(x => x.name == dayNumber);
            if (t) {
                this.timelineDays.push(t);
            } else {
                this.timelineDays.push({name: '', id: dayNumber});
            }
        })

    }

    chooseExactDate(day) {
        if (day.name) {
            this.state.go('dashboard.general-news', {
                loadExactlyDayNews: true,
                month: this.currentMonth,
                day: day.name
            }, {reload: true});
        }
    }
}
