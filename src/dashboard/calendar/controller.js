'use strict';

const COLUMN_AMOUNT = 7;

export default class СalendarCtrl {
    constructor(calendar, calendarService, subscriptions) {
        calendar.forEach(day => {
           day.matches.forEach(match => {
               var subscr = subscriptions.find(subscr => subscr.match_id == match.id);
               if(subscr) {
                   match.isSubscribed = true;
                   match.subscrId = subscr.id;
               }
           });
        });
        this.calendar = calendar;
        this.service = calendarService;
        this.timeGrid = this.createTimeGrid();
        this.minDate = moment(calendar[0].day).toDate();
        this.maxDate = moment(calendar[calendar.length -1].day).toDate();
        this.allMatches = true;
        this.subscribed = true;

        this.updateCalendar(moment());


        this.filterByToggle = match => {
            return this.allMatches ? true : this.subscribed ? match.isSubscribed : false;
        };
    }

    updateCalendar(day) {
        const calendarDayIndex = this.calendar.findIndex(cell => cell.day == moment(day).format('YYYY-MM-DD'));
        if(calendarDayIndex == -1) {
            this.daysToShow = [];
            this.daysToShow.push(moment(day).add(-3, 'd').format('YYYY-MM-DD'));
            this.daysToShow.push(moment(day).add(-2, 'd').format('YYYY-MM-DD'));
            this.daysToShow.push(moment(day).add(-1, 'd').format('YYYY-MM-DD'));
            this.daysToShow.push(moment(day).format('YYYY-MM-DD'));
            this.daysToShow.push(moment(day).add(1, 'd').format('YYYY-MM-DD'));
            this.daysToShow.push(moment(day).add(2, 'd').format('YYYY-MM-DD'));
            this.daysToShow.push(moment(day).add(3, 'd').format('YYYY-MM-DD'));
        } else {
            const startIndex = calendarDayIndex == this.calendar.length - 1 ? this.calendar.length - 7 : calendarDayIndex - 3 > 0 ? calendarDayIndex - 3 : 0;
            const endIndex = calendarDayIndex == 0 ? 7 : calendarDayIndex + 4 < this.calendar.length - 1 ? calendarDayIndex + 4 : this.calendar.length;
            this.daysToShow = this.calendar.slice(startIndex, endIndex).map(day => day.day);
        }

        const wholeGrid = [];

        for (let i = 0; i < this.timeGrid.length; i++) {
            const row = [];
            for (let j = 0; j < this.daysToShow.length; j++) {
                row.push({
                    day: this.daysToShow[j],
                    matches: []
                })
            }
            wholeGrid.push({
                row: row,
                timeId: this.timeGrid[i]
            });
        }

        for (let i = 0; i < this.timeGrid.length; i++) {
            const row = wholeGrid[i].row;
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];
                const matches = this.getDayMatchesByTimeId(cell.day, i);
                cell.matches = matches;
            }
        }

        this.grid = [];
        for (let i = 0; i < wholeGrid.length; i++) {
            const row = wholeGrid[i].row;
            let deleteRow = true;
            let cellWithMatches = 0;
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];
                if (cell.matches.length) {
                    deleteRow = false;
                    cellWithMatches++;
                }
            }
            if (!deleteRow) {
                wholeGrid[i].secondTdArray = Array.from(new Array(COLUMN_AMOUNT - cellWithMatches), (x,i) => i);
                this.grid.push(wholeGrid[i]);
            }

        }
    }

    getDayMatchesByTimeId(day, time) {
        day = this.calendar.find(d => d.day == day);
        if(!day) {
            return [];
        }
        const matches = [];
        day.matches.forEach(event => {
            const hour = moment(event.when).hour();
            if (hour == time) {
                matches.push(event);
            }
        });

        return matches;
    }

    createTimeGrid() {
        return Array.from(new Array(24), (x,i) => i);
    }

    subscribe(match){
        if(!match.isSubscribed) {
            this.service.unsubscribe(match.subscrId).then(() => {
                match.isSubscribed = false;
                match.subscrId = undefined;
            }).catch(() => {
                match.isSubscribed = true;
            })
        } else {
            this.service.subscribe(match.id).then((res) => {
                match.isSubscribed = true;
                match.subscrId = res.subscription.id;
            }).catch(() => {
                match.isSubscribed = false;
            })
        }
    }

}
