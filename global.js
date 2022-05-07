

function startTheJourney() {
    $('.top-cover').eq(0).addClass('hide');            
    $('body').eq(0).css('overflow', 'visible');

    playMusicOnce();

    setTimeout(function() {
        
        $('.aos-animate').each(function(i, el){
           
            if ($(el).closest('.top-cover').length == 0) {
                
                $(el).removeClass('aos-animate');
                setTimeout(function(){
                    // Add 'aos-amimate' class
                    $(el).addClass('aos-animate');
                }, 1000);
            }            
        });
    }, 50);

    setTimeout(function(){
        $('.top-cover').eq(0).remove();
    }, 3000);    
}



/*  ==============================
        MUSIC
============================== */
var isMusicAttemptingToPlay = false,
    isMusicPlayed = false,
    playBoxAnimation,
    pauseBoxAnimation,
    pauseMusic,
    playMusic;

// Background Music
(function backgroundMusic() {
    if (typeof window.MUSIC != 'undefined') {        
        var url = window.MUSIC.url,
            box = window.MUSIC.box;

        // if url is not empty and the box so
        if (url != '' && box.length) {
            var backgroundMusic = document.createElement("audio");    // Background Music
            backgroundMusic.autoplay = true;
            backgroundMusic.loop = true;
            backgroundMusic.load();
            backgroundMusic.src = url;

            // ---------- Playing Box Animation (Function) --------------------------------------------------
            playBoxAnimation = function() {
                if (!$(box).hasClass('playing')) {
                    $(box).addClass('playing');
                }
                if ($(box).css('animationPlayState') != 'running') {
                    $(box).css('animationPlayState', 'running');                
                }
            }

            // ---------- Pause Box Animation (Function) --------------------------------------------------
            pauseBoxAnimation = function() {
                if ($(box).hasClass('playing')) {
                    if ($(box).css('animationPlayState') == 'running') {
                        $(box).css('animationPlayState', 'paused');
                    }
                }
            }

            // ---------- Pause Music (Function) --------------------------------------------------
            pauseMusic = function() {
                isMusicAttemptingToPlay = false;
                var promise = backgroundMusic.pause();
                isMusicPlayed = false;
                pauseBoxAnimation();
            };

            // ---------- Play Music (Function) --------------------------------------------------
            playMusic = function() {
                isMusicAttemptingToPlay = false;
                var promise = backgroundMusic.play();
                if (promise !== undefined) {
                    promise.then(_ => {
                        isMusicPlayed = true;
                        // console.log('Audio berhasil diputar');
                        playBoxAnimation();
                    }).catch(error => {
                        isMusicPlayed = false;
                        // console.log('Tidak dapat memutar audio');
                        pauseBoxAnimation();
                    });
                }                
            };

            // ---------- Music Box [ON CLICK] --------------------------------------------------
            $(document).on('click', box, function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (isMusicPlayed) {
                    pauseMusic();
                    isMusicAttemptingToPlay = true;
                } else {
                    playMusic();
                }
            });

            

            // Window On Load
            window.onload = function() {
                if (!isMusicAttemptingToPlay && !isMusicPlayed) {
                    isMusicAttemptingToPlay = true;
                    playMusicOnce();
                }
            }
                        
        }        
    }
}());

// ---------- Play Music Once --------------------------------------------------
function playMusicOnce() {
    playMusic();
    setTimeout(function(){
        if (isMusicPlayed) {
            pauseMusic();
            setTimeout(playMusic, 1500);
        }    
    }, 50);    
}

// ---------- Trigger Music to play when document is scroled or clicked --------------------------------------------------
$(document).on('click', function(e) {
    if (!isMusicAttemptingToPlay && !isMusicPlayed) {
        isMusicAttemptingToPlay = true;
        playMusicOnce();
    }
});

$('.top-cover').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
});

// ---------- Pause Audio When Click Video ---------------------------------------------------------------
$(document).on('click', '.play-btn', function(e){
    e.preventDefault();
    e.stopPropagation();
    if (isMusicPlayed) {
        pauseMusic();
        isMusicAttemptingToPlay = true;
    }
});
