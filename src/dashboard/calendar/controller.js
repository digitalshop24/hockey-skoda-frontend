'use strict';


export default class СalendarCtrl {
    constructor(calendar) {
        this.calendar = calendar;
        this.timeGrid = this.createTimeGrid();
        this.updateCalendar(8);
    }

    updateCalendar(calendarDayIndex) {
        this.daysToShow = this.calendar.slice(calendarDayIndex - 3, calendarDayIndex + 4).map(day => day.day);
        const wholeGrid = [];

        for (let i = 0; i < this.timeGrid.length; i++) {
            const row = [];
            for(let j = 0; j < this.daysToShow.length; j++) {
                row.push({
                    day: this.daysToShow[j],
                    matches: []
                })
            }
            wholeGrid.push({
                row: row,
                timeId : this.timeGrid[i]
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
        for(let i =0; i < wholeGrid.length; i++) {
            const row = wholeGrid[i].row;
            let deleteRow = true;
            for(let j = 0; j < row.length; j++) {
                const cell = row[j];
                if(cell.matches.length) {
                    deleteRow = false;
                }
            }
            if(!deleteRow) {
                this.grid.push(row);
            }

        }

        const a = "";
    }

    getDayMatchesByTimeId(day, timeId) {
        day = this.calendar.find(d => d.day == day);

        const matches = [];
        day.events.forEach(event => {
            const hour = moment(event.when).hour();
            const minutes = moment(event.when).minute();
            const timeGridId = this.getTimeGridIndex(hour, minutes);
            if(timeGridId == timeId) {
                matches.push(event);
            }
        });

        return matches;
    }

    createTimeGrid() {
        return  [
            {hour: 0, minutes:0}, {hour: 1, minutes:30}, {hour: 3, minutes:0}, {hour: 4, minutes:30}, {hour: 6, minutes:0}, {hour: 7, minutes:30},
            {hour: 9, minutes:0}, {hour: 10, minutes:30}, {hour: 12, minutes:0}, {hour: 13, minutes:30}, {hour: 15, minutes:0},
            {hour: 16, minutes:30}, {hour: 18, minutes:0}, {hour: 19, minutes:30}, {hour: 21, minutes:0}, {hour: 22, minutes:30}, {hour: 24, minutes:0}

        ];
    }

    getTimeGridIndex(hour, minutes) {
        /*this.timeGrid.findIndex( (cell, index) => {
            cell.hour
        })*/

        for (let i = 0; i < this.timeGrid.length - 1; i++) {
            const first = this.timeGrid[i];
            const second = this.timeGrid[i+1];

            if (first.hour <= hour && hour <= second.hour &&
                ( (first.hour < hour && hour < second.hour) ||
                (first.hour == hour ? first.minutes <= minutes : minutes < second.minutes ) )) {
                return i;
            }
        }
    }

}