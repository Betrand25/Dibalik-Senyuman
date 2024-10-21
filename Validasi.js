document.addEventListener('DOMContentLoaded', function() {
    const likeButton = document.getElementById('likeButton');
    const likeIcon = likeButton.querySelector('.fa-thumbs-up');
    const dislikeIcon = likeButton.querySelector('.dislike-icon');
    const playButton = document.getElementById('playButton');
    const fullScreenVideoContainer = document.getElementById('fullScreenVideoContainer');
    const fullScreenVideo = document.getElementById('fullScreenVideo');
    const watchTrailerButton = document.getElementById('watchTrailerButton');
    const movieBackground = document.getElementById('MovieBackground');
    const backButton = document.getElementById('backButton');

    // Fungsi untuk toggle antara like dan dislike
    likeButton.addEventListener('click', function() {
        const isLiked = getComputedStyle(likeIcon).display !== 'none';
        likeIcon.style.display = isLiked ? 'none' : 'inline-block';
        dislikeIcon.style.display = isLiked ? 'inline-block' : 'none';
    });

    // Fungsi untuk memutar video penuh dalam mode layar penuh
    playButton.addEventListener('click', function() {
        movieBackground.pause(); // Hentikan trailer saat full movie dimulai
        fullScreenVideoContainer.style.display = 'flex';
        if (fullScreenVideo.requestFullscreen) {
            fullScreenVideo.requestFullscreen();
        } else if (fullScreenVideo.mozRequestFullScreen) { // Firefox
            fullScreenVideo.mozRequestFullScreen();
        } else if (fullScreenVideo.webkitRequestFullscreen) { // Chrome, Safari and Opera
            fullScreenVideo.webkitRequestFullscreen();
        } else if (fullScreenVideo.msRequestFullscreen) { // IE/Edge
            fullScreenVideo.msRequestFullscreen();
        }
        fullScreenVideo.play();
    });

    // Fungsi untuk kembali dari mode layar penuh
    backButton.addEventListener('click', function() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
        fullScreenVideoContainer.style.display = 'none';
        fullScreenVideo.pause();
        fullScreenVideo.currentTime = 0;

        // Mulai kembali trailer ketika kembali dari mode layar penuh
        movieBackground.currentTime = 0;
        movieBackground.play();
    });

    // Fungsi untuk menghentikan video trailer dan mengatur ulang
    watchTrailerButton.addEventListener('click', function() {
        movieBackground.pause();
        movieBackground.currentTime = 0;
    });

    document.querySelector('.watch').addEventListener('click', openPopup);
    document.querySelector('.close').addEventListener('click', closePopup);

    // Mengatur ulang video ketika keluar dari mode layar penuh
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) {
            fullScreenVideo.pause();
            fullScreenVideo.currentTime = 0;
            fullScreenVideoContainer.style.display = 'none';

            // Mulai kembali trailer ketika keluar dari mode layar penuh
            movieBackground.currentTime = 0;
            movieBackground.play();
        }
    });
});

// Fungsi untuk membuka popup
function openPopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const movieBackground = document.getElementById('MovieBackground');
    
    popup.style.opacity = '1';
    popup.style.visibility = 'visible';
    overlay.style.display = 'block';
    document.body.classList.add('no-scroll');

    movieBackground.currentTime = 0;
    movieBackground.play();
}

// Fungsi untuk menutup popup
function closePopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const movieBackground = document.getElementById('MovieBackground');
    
    popup.style.opacity = '0';
    popup.style.visibility = 'hidden';
    overlay.style.display = 'none';
    document.body.classList.remove('no-scroll');

    movieBackground.pause();
    movieBackground.currentTime = 0;
}

document.addEventListener("DOMContentLoaded", function() {
    const wrapper = document.querySelector('#scene .wrapper');

    function duplicateContent() {
        let originalContent = wrapper.innerHTML;
        wrapper.innerHTML = originalContent + originalContent + originalContent;
        setTimeout(() => {
            // Mengatur posisi awal scroll ke bagian tengah dari konten yang diduplikasi
            wrapper.scrollLeft = wrapper.scrollWidth / 3; 
            console.log("Initial scroll position set to: ", wrapper.scrollLeft);
        }, 100);
    }
    
    // Inisialisasi duplikasi konten
    duplicateContent();

    // Mengatur Ulang Scroll
    function checkScrollDirection(event) {
        let maxScrollLeft = wrapper.scrollWidth - wrapper.clientWidth;
        console.log("Current scrollLeft: ", wrapper.scrollLeft);
        // Memastikan scroll tetap dalam range yang diinginkan
        if (wrapper.scrollLeft < wrapper.clientWidth) {
            wrapper.scrollLeft += wrapper.clientWidth;
        } else if (wrapper.scrollLeft > maxScrollLeft - wrapper.clientWidth) {
            wrapper.scrollLeft -= wrapper.clientWidth;
        }
    }

    wrapper.addEventListener('scroll', checkScrollDirection);
});
