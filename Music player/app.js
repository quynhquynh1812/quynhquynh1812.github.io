const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');

// const PlAYER_STORAGE_KEY = "F8_PLAYER";

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Chạy ngay đi',
            singer: 'Sơn Tùng-MTP',
            image: 'https://photo-cms-nghenhinvietnam.zadn.vn/Uploaded/ngochai/2018_05_08/mtp/3017121813395120728165863161930184474875687o_15250322704071102706586_15251160289821556458009_DAMF.jpg',
            path: './assets/musics/chayngaydi.mp3'
        },
        {
            name: 'Chúng ta không thuộc về nhau',
            singer: 'Sơn Tùng-MTP',
            image: 'https://i1.sndcdn.com/artworks-000174619436-upqaqb-t500x500.jpg',
            path: './assets/musics/chungtakthuocvenhau.mp3'
        },
        {
            name: 'Có chắc yêu là đây',
            singer: 'Sơn Tùng-MTP',
            image: 'https://o.vdoc.vn/data/image/2020/07/07/hinh-nen-son-tung-mtp-2.jpg',
            path: './assets/musics/cochacyeuladay.mp3'
        },
        {
            name: 'Hãy trao cho anh',
            singer: 'Sơn Tùng-MTP',
            image: 'https://dep.com.vn/wp-content/uploads/2019/07/deponline-sontung.jpg',
            path: './assets/musics/haytraochoanh.mp3'
        },
        {
            name: 'Lạc trôi',
            singer: 'Sơn Tùng-MTP',
            image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Son_Tung_M-TP_-_Lac_troi.png/220px-Son_Tung_M-TP_-_Lac_troi.png',
            path: './assets/musics/lactroi.mp3'
        },
        {
            name: 'Muộn rồi mà sao còn',
            singer: 'Sơn Tùng-MTP',
            image: 'https://pbs.twimg.com/media/Ez5jRyVVgAQN6Kh.jpg',
            path: './assets/musics/muonroimasaocon.mp3'
        },
        {
            name: 'Nơi này có anh',
            singer: 'Sơn Tùng-MTP',
            image: 'https://upload.wikimedia.org/wikipedia/vi/archive/1/1d/20210321120435%21N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg',
            path: './assets/musics/noinaycoanh.mp3'
        },
    ],

    // setConfig: function (key, value) {
    //     this.config[key] = value;
    //     localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
    //   },

    render: function () {
        const html = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? "active" : ""
                }" data-index="${index}">
                  <div class="thumb"
                      style="background-image: url('${song.image}')">
                  </div>
                  <div class="body">
                      <h3 class="title">${song.name}</h3>
                      <p class="author">${song.singer}</p>
                  </div>
                  
              </div>`
        })
        playlist.innerHTML = html.join('')
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },
    handleEvent: function () {
        const cdWidth = cd.offsetWidth;
        const _this = this;

        //Xử lý hình ảnh quay
        const cdThumbAnimate = cdThumb.animate([
            { transform: "rotate(360deg)" }
        ], {
            duration: 10000, // 10 giây
            iterations: Infinity //Số lần quay vô hạn
        })
        cdThumbAnimate.pause();

        //Xử lý phóng to thu nhỏ Cd
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newcdWidth = cdWidth - scrollTop;

            cd.style.width = newcdWidth > 0 ? newcdWidth + 'px' : 0;
            cd.style.opacity = newcdWidth / cdWidth
        }

        //Xử lý play/ pause
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        //Khi song được play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play()
        }

        //Khi song bị pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        //Khi tiến đọ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent
            }
        }

        // Khi tua bài hát
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime
        }

        //Khi next bài hát
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandom();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        //Khi prev bài hát
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandom();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        //Khi random
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        //xử lý next song khi end
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else
                nextBtn.click();
        }

        //Xử lý lặp lại bài hát
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest(".song:not(.active)");

            if (songNode || e.target.closest(".option")) {
                // Xử lý khi click vào song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadcurrentSong();
                    _this.render();
                    audio.play();
                }

                // Xử lý khi click vào song option
                if (e.target.closest(".option")) {
                }
            }
        };
    },
    loadcurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadcurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadcurrentSong()
    },
    playRandom: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadcurrentSong();

    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            if (this.currentIndex <= 3) {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                });
            } else {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }, 300);
    },

    start: function () {
        // Gán cấu hình từ config vào ứng dụng
        // this.loadConfig();

        //Định nghĩa các thuộc tính cho object
        this.defineProperties()

        // Lắng nghe / xử lý các sựu kiện (DOM event)
        this.handleEvent()

        //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadcurrentSong()

        // Render playlist
        this.render()

        // Hiển thị trạng thái ban đầu của button repeat & random
        randomBtn.classList.toggle("active", this.isRandom);
        repeatBtn.classList.toggle("active", this.isRepeat);
    }
}
app.start()
