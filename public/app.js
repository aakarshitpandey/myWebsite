/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

particlesJS.load('particles-js', 'particles.json',
  () => {
    // console.log('Particles.js is running...')
    // document.getElementById('main-body').style.display = '';
    document.getElementById('loader').style.transition = "all 2s"
    document.getElementById('loader').style.display = 'none';
  }
);