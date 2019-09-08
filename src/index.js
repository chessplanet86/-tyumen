Vue.component('modal', {
    template: '#modal-template'
})

const app = new Vue({
    el: '#app',
    data() {

        return {
            showModal: false,
            player: '',
            pairImg: [],
            h0: null,
            h1: null,
            h2: null,
            h3: null,
            h4: null,
            h5: null,
            h6: null,
            h7: null,
            h8: null,
            h9: null,
            h10: null,
            h11: null,
            h12: null,
            h13: null,
            h14: null,
            h15: null,
            h16: null,
            h17: null,
            h18: null,
            h19: null,
            h20: null,
            h21: null,
            h22: null,
            h23: null,
            h24: null,
            h25: null,
            h26: null,
            h27: null,
            h28: null,
            h29: null,
            h30: null,
            h31: null,
            h32: null,
            h33: null,
            h34: null,
            h35: null,
            s0: null,
            s1: null,
            s2: null,
            s3: null,
            s4: null,
            s5: null,
            s6: null,
            s7: null,
            s8: null,
            s9: null,
            s10: null,
            s11: null,
            s12: null,
            s13: null,
            s14: null,
            s15: null,
            s16: null,
            s17: null,
            s18: null,
            s19: null,
            s20: null,
            s21: null,
            s22: null,
            s23: null,
            s24: null,
            s25: null,
            s26: null,
            s27: null,
            s28: null,
            s29: null,
            s30: null,
            s31: null,
            s32: null,
            s33: null,
            s34: null,
            s35: null,
            countOpenCards: 0,
            classFirstCard: null,
            classSecondCard: null,
            couple: [],
            totalSeconds: 0,
            seconds: '00',
            minutes: '00',
            hours: '00',
            fiveSec: 5,
            statusStart: 0,
            lastCard: null,
            tagLastCard: null,
            tagCurentCard: null,
            countPair: 0,
            similarity: -1,
            hidenButtonStart: true,
            set: new Set(),
            countStartClick: true,
            raitings: [],
            countGame: 1,
            error: '',



        }
    },
    created() {


    },
    computed: {
        //метод сортирующий результаты игроков по затраченному времени.
        sortRaitings() {
            this.raitings.sort((a, b) => a.time - b.time);
        },
        //метод, сохраняющий результаты игры
        saveTime() {
            if (this.countPair == 18) {
                let nowDate = new Date();
                nowDate = nowDate.getHours() + ':' + nowDate.getMinutes() + nowDate.getSeconds();
                this.raitings.push({
                    game: this.countGame,
                    time: this.hours + ':' + this.minutes + ':' + this.seconds,
                    player: this.player,
                    date: nowDate,
                })

            }
        },
        //метод, вычисляющий время
        time() {
            if (this.countPair == 18) {
                this.countPair = 0;
                return console.log('стоп игра!')
            }
            if (this.totalSeconds / 3600 < 10) {
                this.hours = '0' + Math.trunc(this.totalSeconds / 3600);
            } else {
                this.hours = Math.trunc(this.totalSeconds / 3600);
            }

            if (this.totalSeconds / 60 < 10) {
                this.minutes = '0' + Math.trunc(this.totalSeconds / 60);
            } else {
                this.minutes = Math.trunc(this.totalSeconds / 60);
            }

            if (this.totalSeconds % 60 < 10) {
                this.seconds = '0' + this.totalSeconds % 60;
            } else {
                this.seconds = this.totalSeconds % 60;
            }
        },
        // метод, сравнивающий пары
        checkPair() {

            if (this.countOpenCards == 2) {
                let first = this.tagCurentCard.children[0].className;
                let second = this.tagLastCard.children[0].className;

                if (first == second) {
                    this.countPair++;
                    app['h' + this.lastCard] = false;
                    app['h' + this.curentCard] = false;

                    app['s' + this.lastCard] = true;
                    app['s' + this.curentCard] = true;

                    this.set.add(this.lastCard);
                    this.set.add(this.curentCard);
                    console.log(this.set);

                    this.countOpenCards = 0;
                    this.fiveSec = 5;
                    this.similarity = 0;
                    this.lastCard = null;

                } else {
                    app['h' + this.lastCard] = false;
                    app['h' + this.curentCard] = false;
                    this.countOpenCards = 0;
                    this.fiveSec = 5;
                    this.similarity = 0;
                    this.lastCard = null;
                }

            }
        }
    },

    methods: {
        /*Таймер. Нажимаем на кнопку. Печатается текущаяя секунда, значение моментально увеличивается на 1
        Затем вызывается еще раз функция*/
        //-->
        plusOne() {
            setTimeout(() => {
                this.totalSeconds++;
                this.plusOne();
            }, 1000);
        },
        //<--
        closeModal() {
            this.showModal = false;
        },
        openModal() {
            this.showModal = true;
            this.error = '';
            this.player = '';
        },
        countDown() {
            if (this.similarity == 0) {
                this.similarity = -1;
                this.fiveSec = 5;
                return;
            }
            if (this.fiveSec == 0) {
                app['h' + this.lastCard] = false;
                this.countOpenCards = 0;
                this.lastCard = null;
                return this.fiveSec = 5;
            }
            setTimeout(() => {
                if (this.fiveSec != 0) {
                    this.fiveSec--;
                    this.countDown();
                } else {

                }
            }, 1000)
        },
        startGame() {
            //Разбрасываем карточки в случайном порядке
            if (this.player == '' || this.player == null) {
                this.error = "Укажите имя";
            } else {
                this.showModal = false;
                this.pairImg.length = 0;
                this.countOpenCards = 0;
                this.classFirstCard = null;
                this.classSecondCard = null;
                this.couple.length = 0;
                this.totalSeconds = 0;
                this.seconds = '00';
                this.minutes = '00';
                this.hours = '00';
                this.fiveSec = 5;
                this.statusStart = 0;
                this.lastCard = null;
                this.tagLastCard = null;
                this.tagCurentCard = null;
                this.countPair = 0;
                this.similarity = -1;

                this.set = new Set();
                this.toRandomPair(); // Cоставляем рандомный порядок карточек
                this.toHideIcon(); //Скрываем иконки
                this.statusStart = 1;
                if (this.countStartClick == true) {
                    this.plusOne();
                }
                if (this.countStartClick == false) {
                    this.totalSeconds = 0;
                }
                this.countStartClick = false;
                this.hidenButtonStart = false;
            }



        },
        toHideIcon() {
            console.log('Выполнился метод toHideIcon')
            let hidenLength = 36;
            for (let i = 0; i < hidenLength; i++) {
                app['h' + i] = false;
                app['s' + i] = false;
            }
        },
        toRandomPair() {
            //Алгоритм Фишера-Йетса для перемешивания -->
            console.log('выполнился метод toRandomPair');

            function fisher(arr) {
                let j, temp;
                for (let i = arr.length - 1; i > 0; i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    temp = arr[j];
                    arr[j] = arr[i];
                    arr[i] = temp;
                }
                return arr;
            }
            //<--
            for (let i = 1; i < 19; i++) {
                this.pairImg.push('img' + i);
                this.pairImg.push('img' + i);
            }
            fisher(this.pairImg);
            console.log(this.pairImg);
        },
        openCard(event, n) {
            if (this.statusStart == 1) {
                if (this.set.has(n) == false) {
                    if (this.lastCard != n) {

                        if (this.statusStart == 1) {
                            if (this.countOpenCards == 1) {
                                console.log('выполнился метод OpenCard');
                                app['h' + n] = true;
                                this.curentCard = n;
                                this.tagCurentCard = event.target;
                                this.countOpenCards = 2;
                            }
                            if (this.countOpenCards == 0) {
                                console.log('выполнился метод OpenCard');
                                app['h' + n] = true;
                                this.countOpenCards += 1;
                                this.lastCard = n;
                                this.tagLastCard = event.target;
                                this.countDown();
                            } else {
                                console.log('Количество открытых карточек', this.countOpenCards);

                            }
                        }
                    }
                }

            }


        }
    }
})