
 // loading visibility
 document.addEventListener('DOMContentLoaded', function() {
 var boxDiv = document.querySelectorAll('.box');

 boxDiv.forEach(function(box) {

    var video = box.querySelector('.vid');
    var image=box.querySelector('.thumbnail');
    var vid1Div=box.querySelector('.vid1');
    var loadingDiv =box.querySelector('.cards');
    var detailsDiv=box.querySelector('.details');
    var metadataDiv=box.querySelector('.metadata');
    var overlay = box.querySelector('#overlay');

    var backgroundImage = image.style.backgroundImage;
    var url=backgroundImage.split('"')[1];
    var img = new Image();
   img.src = url;
   
    
   img.onload = function() {
        loadingDiv.style.display='none';
 vid1Div.style.display='';
 detailsDiv.style.display='';
 metadataDiv.style.display='';

//video duration show

video.addEventListener('loadeddata', function() {
    overlay.style.display = 'block';
    const totalDuration = video.duration;
    const formattedDuration = formatTime(totalDuration);
    overlay.innerHTML = `${formattedDuration}`;
   
});

video.addEventListener('timeupdate', function() {
    const remainingTime = video.duration - video.currentTime;
    const formattedRemainingTime = formatTime(remainingTime);
    overlay.innerHTML = `${formattedRemainingTime}`;
});

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds %3600 )/ 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${hours<1? `${minutes}:${remainingSeconds < 10? '0' + remainingSeconds : remainingSeconds}` : `${hours}:${minutes}:${remainingSeconds}`}`;
}


    };


});


 });





// autoplay video on hover
document.addEventListener('DOMContentLoaded', function() {

    // Select all .vid1 elements
    var vid1Divs = document.querySelectorAll('.vid1');

    vid1Divs.forEach(function(vid1Div) {
        // Get the video and buttons within the current .vid1 container
        var video = vid1Div.querySelector('.vid');
        var muteButton = vid1Div.querySelector('#mute');
        var unmuteButton = vid1Div.querySelector('#unmute');
        var thumbnail = vid1Div.querySelector('.thumbnail');
        var progressBar = vid1Div.querySelector('#custom-progress-bar');
    var progressIndicator = vid1Div.querySelector('#progress-indicator');
    var progressCircle = vid1Div.querySelector('#progress-circle');
    var clickArea = vid1Div.querySelector('#tap-area');

    //if video is loaded then only do the hover to play
    video.addEventListener('loadeddata',function(){
    
        // Mouseover event to play video and show the correct button
        vid1Div.addEventListener('mouseover', function() {
           progressBar.style.display='';
           progressIndicator.style.display='';
           
            video.play(); // Play the video
            thumbnail.style.display ='none';   

    video.addEventListener('timeupdate', function() {
        
        var progress = (video.currentTime / video.duration) * 100;
        progressBar.value = progress;
        // For custom progress bar
        if (progressIndicator) {
            progressIndicator.style.width = `${progress}%`;
           
                progressCircle.style.left = `calc(${progress}% - 7.5px)`; 
        }
    });
     // For custom progress bar
     if (progressIndicator) {
        progressBar.addEventListener('click', (e) => {
        const progressContainerWidth = e.currentTarget.offsetWidth;
        const clickX = e.offsetX;
        const newTime = (clickX / progressContainerWidth) * video.duration;
        video.currentTime = newTime;
    });
   clickArea.addEventListener('click', (e) => {
        const progressContainerWidth = e.currentTarget.offsetWidth;
        const clickX = e.offsetX;
        const newTime = (clickX / progressContainerWidth) * video.duration;
        video.currentTime = newTime;
    });
    }

            // Show the relevant button based on the video's muted state
            if (video.muted) {
                muteButton.style.display = '';
                unmuteButton.style.display = 'none';
            } else {
                muteButton.style.display = 'none';
                unmuteButton.style.display = '';
            }
 // Show the progress circle when hovering over the progress bar
 progressBar.addEventListener('mouseover', function() {
                progressCircle.style.opacity = '1'; // Make it visible
            });
           clickArea.addEventListener('mouseover', function() {
                progressCircle.style.opacity = '1'; // Make it visible
            });
            clickArea.addEventListener('mouseout', function() {
                progressCircle.style.opacity = '0'; // Make it visible
            });
            progressCircle.addEventListener('mouseover', function() {
                progressCircle.style.opacity = '1'; // Make it visible
            });

        });
    });

        // Mouseout event to pause video and hide buttons
        vid1Div.addEventListener('mouseout', function() {
            video.pause(); // Pause the video
            progressBar.style.display='none';
           progressIndicator.style.display='none';
          
            thumbnail.style.display ='';
            // Hide both buttons
            muteButton.style.display = 'none';
            unmuteButton.style.display = 'none';
        });

        // Click events to toggle mute/unmute state
        muteButton.addEventListener('click', function() {
            toggleMute(video, muteButton, unmuteButton);
        });

        unmuteButton.addEventListener('click', function() {
            toggleMute(video, muteButton, unmuteButton);
        });
    });

    // Function to toggle mute/unmute state
    function toggleMute(video, muteButton, unmuteButton) {
        if (video.muted) {
            video.muted = false; // Unmute the video
            muteButton.style.display = 'none'; // Hide mute button
            unmuteButton.style.display = ''; // Show unmute button
        } else {
            video.muted = true; // Mute the video
            muteButton.style.display = 'inline-block'; // Show mute button
            unmuteButton.style.display = 'none'; // Hide unmute button
        }
    }

});

document.addEventListener('DOMContentLoaded', function() {
// Function to update the visibility of the scroll buttons based on the scroll position
function updateScrollButtonVisibility() {
    var leftButton = document.querySelector('.scroll-btn-left');
    var rightButton = document.querySelector('.scroll-btn-right'); // Assuming you have a class for the right button
    var scrollableDiv = document.getElementById('scroll-bardiv');

    // Update visibility of the left button
    if(scrollableDiv.scrollLeft === 0) {
        leftButton.style.display = 'none'; // Hide the left button if at the beginning
    } else {
        leftButton.style.display = ''; // Reset the display property to its default value
    }

    // Update visibility of the right button using an alternative logic
    if(scrollableDiv.scrollLeft>=(scrollableDiv.scrollWidth - scrollableDiv.clientWidth )) {
        rightButton.style.display = 'none'; // Show the right button if not scrolled to the end
    } else {
        rightButton.style.display = ''; // Hide the right button if scrolled to the end
    }
}

// Add event listeners for the scroll left and right buttons
document.getElementById('scrollLeftBtn').addEventListener('click', function() {
    var scrollableDiv = document.getElementById('scroll-bardiv');
    scrollableDiv.scrollLeft -= 200; // Scroll left by 200px
    updateScrollButtonVisibility(); // Update the visibility of the scroll buttons after scrolling
});

document.getElementById('scrollRightBtn').addEventListener('click', function() {
    var scrollableDiv = document.getElementById('scroll-bardiv');
    scrollableDiv.scrollLeft += 200; // Scroll right by 200px
    updateScrollButtonVisibility(); // Update the visibility of the scroll buttons after scrolling
});

// Add an event listener to the scrollableDiv to update the visibility of the scroll buttons on scroll
var scrollableDiv = document.getElementById('scroll-bardiv');
scrollableDiv.addEventListener('scroll', function() {
    updateScrollButtonVisibility();
});
});

document.addEventListener('DOMContentLoaded', function() {
// Initially set the visibility of the scroll buttons based on the scroll position
updateScrollButtonVisibility();
});


 // Get the input element
 var inputBox = document.querySelector('.search-div');
    var svg = document.querySelector('.svgsrch');
    var inputField = document.querySelector('.search-input input'); // Assuming the input field has a class 'search-input'
    var removeSearchQueryButton = document.querySelector('.button-search-rmv');
    
    // Function to clear the input field's value
    function clearInput() {
        inputField.value = ''; // Clear the input field
        inputField.focus(); // Keep focus on the input field after clearing
        removeSearchQueryButton.style.display = 'none'; // Hide the remove search query button
    }
    
    // Add an event listener to the input field for the "focus" event
    inputField.addEventListener('focus', function(event) {
        // This function will be called whenever the input field gains focus
        // Add the "clicked" class to change CSS
        inputBox.classList.add('clicked');
        svg.style.display = '';
        if (inputField.value.trim() !== '') {
            // Show the remove search query button if the input field has a value
            removeSearchQueryButton.style.display = '';
        }
    });
    
    // Add an event listener to the input field for the "blur" event
    inputField.addEventListener('blur', function(event) {
        // This function will be called whenever the input field loses focus
        // Remove the "clicked" class to change CSS
        inputBox.classList.remove('clicked');
        svg.style.display = 'none';
    });
    
    // Add an event listener to the input field for the "input" event
    inputField.addEventListener('input', function(event) {
        // Check if the input field has a value
        if (inputField.value.trim() !== '') {
            // Show the remove search query button if the input field has a value
            removeSearchQueryButton.style.display = '';
        } else {
            // Hide the remove search query button if the input field is empty
            removeSearchQueryButton.style.display = 'none';
        }
    });

var width;
    function changeStructure() {
      document.addEventListener('DOMContentLoaded', function() {
            var nav = document.querySelector('.nav');
            if (width === undefined) {
      
                width = nav.clientWidth;
            }});
        var navbar = document.querySelector('.navbar');
            navbar.classList.toggle('expanded');
          
    var container = document.querySelector('.content-container');
            var additionalContainer = document.querySelector('.container2');
            var lastButton=document.querySelector("#you-btn");
           

            if (navbar.classList.contains('expanded')) {
        lastButton.style.display = 'none';
        additionalContainer.style.display = '';
        
        document.addEventListener('DOMContentLoaded', function() {
        nav.style.left = '240px';
       
        nav.style.width = 'calc(' + width + 'px - 160px)';});
        container.style.left = '240px';
    } else {
        additionalContainer.style.display = 'none';
        lastButton.style.display = '';
        document.addEventListener('DOMContentLoaded', function() {
        nav.style.left = '';
       
        nav.style.width =width+'px';}); container.style.left = '';
    }
    
   
    
}

var currentPage = window.location.href;


var buttons = document.querySelectorAll('.btn');
var value;
var path;

buttons.forEach(function(button) {

   
value=button.getAttribute('onclick');
if(value){

    path = value.split("'")[1];

    if (currentPage.includes(path)) {
      
        button.classList.add('hovered');
    }
}
});
var modibuttons = document.querySelectorAll('.modibtn');


modibuttons.forEach(function(modibutton) {

    value=modibutton.getAttribute('onclick');
if(value){
   
   path = value.split("'")[1];
   
    if (currentPage.includes(path)) {
       
        modibutton.classList.add('hovered');
    }
}
});

