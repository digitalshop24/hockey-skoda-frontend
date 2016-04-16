'use strict';

const BLUE_WEIGHT = 1;
const MIN_DISTANCE = 1;
const GREEN_WEIGHT = 2;
const ROW_AMOUNT = 12;
const ROW_WEIGHT = 20;
const GREEN_AMOUNT = 20;
const BLUE_AMOUNT = 20;

export default class CubesCtrl {
    constructor(sectors, sector, prizes, coupons, cubesService, $interval, modal, $state, id, user, session, auth) {
        this.sectors = sectors;
        this.sector = sector;
        this.coupons = coupons;
        this.service = cubesService;
        this.$interval = $interval;
        this.modal = modal;
        this.session = session;
        this.id = id;
        this.user = user;
        this.state = $state;
        this.auth = auth;
        this.categories = [];

        prizes.forEach(prize => {
            if (prize.prize_category) {
                if (this.categories.find(category =>category.name == prize.prize_category.name)) {
                    const category = this.categories.find(category =>category.name == prize.prize_category.name);
                    category.prizes.push(prize);

                } else {
                    this.categories.push({
                        name: prize.prize_category.name,
                        right_answers_count: prize.prize_category.right_answers_count,
                        prizes: []
                    })
                }
            }
        });

        this.table = [];
        const greenCells = sector.cells.filter(cell => cell.cell_type == 'green');
        const blueCells = sector.cells.filter(cell => cell.cell_type == 'blue');
        let greenCounter = 0;
        let blueCounter = 0;

        const shuffleInRowAmount = this.shuffle([1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3]);
        for (let i = 1; i <= ROW_AMOUNT; i++) {

            const greenIndexes = this.createGreenIndexes(shuffleInRowAmount[i - 1]);
            const row = [];

            for (let j = 0; j < ROW_WEIGHT;) {
                if (greenIndexes.indexOf(j) != -1) {
                    row.push({
                        type: 'green',
                        classIndex: Math.floor(Math.random() * (4)) + 1,
                        value: greenCells[greenCounter++]
                    });
                    j += 2;
                } else {
                    row.push({
                        type: 'blue',
                        first: blueCells[blueCounter++],
                        firstClassIndex: Math.floor(Math.random() * (34)) + 1,
                        second: blueCells[blueCounter++],
                        secondClassIndex: Math.floor(Math.random() * (34)) + 1
                    });
                    j++;
                }
            }

            this.table.push({id: i, cells: row});
        }

        $('.game-slider-for').on('afterChange', (event, slick, currentSlide) => {
            $state.go('dashboard.game.cubes', {id: currentSlide + 1});
        });
    }

    brokeCell(cell) {
        if (cell.clickAmount && !cell.is_crashed) {
            this.currentCell = cell;
            this.cubeModalColor = cell.type;
            $('#myModal').modal('show');
        } else {
            cell.clickAmount = 1;
        }
    }

    confirmUserData() {
        this.service.confirmUserData(this.userData).then(res => {
            this.auth.initSession(res);
            this.user = res.data.user;
            $('#userData').modal('hide');
            $('#myModal').modal('show');
            this.startGame();
        });
    }

    startGame() {
        if(!this.user.info_profile_filled) {
            $('#myModal').modal('hide');
            $('#userData').modal('show');
            this.userData = this.user;
            return;
        }

        if(this.busy) return;
        this.busy = true;
        this.service.startGame(this.currentCell.id)
            .then(res => {
                this.busy = false;
                this.quiz = res;
                this.clearAnswers();
                $('#myModal').modal('hide');
                this.startFirstQuestion();
            })
            .catch(err => {
                this.busy = false;
                $('#myModal').modal('hide');
                this.modal.open({
                    resolve: {
                        message: () => {
                            return err.message || 'Ошибка!';
                        }
                    }
                });
            });
    }

    clearAnswers() {
        this.firstAnswer = undefined;
        this.secondAnswer = undefined;
        this.thirdAnswer = undefined;
    }

    startFirstQuestion() {

        $('#firstQuestion').modal('show');
        this.firstQuestionTime = 15;
        this.firstInterval = this.$interval(() => {
            this.firstQuestionTime -= 1;
            if (!this.firstQuestionTime) {
                this.$interval.cancel(this.firstInterval);
            }

        }, 1000);

    }


    startSecondQuestion() {

        this.$interval.cancel(this.firstInterval);
        $('#firstQuestion').modal('hide');
        $('#secondQuestion').modal('show');

        this.secondQuestionTime = 15;
        this.secondInterval = this.$interval(() => {
            this.secondQuestionTime -= 1;
            if (!this.secondQuestionTime) {
                this.$interval.cancel(this.secondInterval);
            }

        }, 1000);

    }

    startThirdQuestion() {

        this.$interval.cancel(this.secondInterval);
        $('#secondQuestion').modal('hide');
        $('#thirdQuestion').modal('show');

        this.thirdQuestionTime = 15;
        this.thirdInterval = this.$interval(() => {
            this.thirdQuestionTime -= 1;
            if (!this.thirdQuestionTime) {
                this.$interval.cancel(this.thirdInterval);
            }

        }, 1000);
    }

    checkAnswers() {
        this.$interval.cancel(this.thirdInterval);
        const answers = [];
        if(this.firstAnswer) {
            let firstAns = "";
            let notFirstTime = false;
            for(let prop in this.firstAnswer) {

                if(this.firstAnswer[prop]) {
                    if(notFirstTime) {
                        firstAns += ', ';
                    }
                    firstAns += this.firstAnswer[prop];
                    notFirstTime = true;
                }
            }
            answers.push(firstAns);
        } else {
            answers.push('');
        }

        if(this.secondAnswer) {
            answers.push(this.secondAnswer);
        } else {
            answers.push('');
        }

        if(this.thirdAnswer) {
            answers.push(+this.thirdAnswer);
        } else {
            answers.push('');
        }


        this.service.checkAnswers(this.quiz.id, answers)
            .then(res => {
                this.currentCell.is_crashed = true;
                this.result = res;
                $('#thirdQuestion').modal('hide');
                $('#resultModal').modal('show');
            }).catch(err => {
                $('#thirdQuestion').modal('hide');
                this.modal.open({
                    resolve: {
                        message: () => {
                            return err.message || 'Ошибка!';
                        }
                    }
                });
            });
    }

    goToPrizes() {
        $('#resultModal').modal('hide');
        this.state.go('dashboard.profile.prizes');
    }

    shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
        return a;
    }

    createGreenIndexes(greenAmount) {
        if (!greenAmount) {
            return [];
        }
        const indexes = [];
        const maxStartIndex = ROW_WEIGHT - (greenAmount * GREEN_WEIGHT + (greenAmount - 1)) - 1;
        const firstIndex = Math.ceil(Math.random() * maxStartIndex);
        indexes.push(firstIndex);
        let currentIndex = firstIndex;
        while (--greenAmount) {
            currentIndex += GREEN_WEIGHT + MIN_DISTANCE;
            const maxIndex = ROW_WEIGHT - (greenAmount * GREEN_WEIGHT + (greenAmount - 1)) - 1;

            currentIndex = Math.floor(Math.random() * ( maxIndex - currentIndex + 1)) + currentIndex;
            indexes.push(currentIndex);
        }
        return indexes;
    }
}