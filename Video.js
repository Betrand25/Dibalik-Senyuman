function showVideo() {
    document.getElementById("videoModal").style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent scrolling
}

function closeVideo() {
    document.getElementById("videoModal").style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
    var video = document.getElementById("trailerVideo");
    video.pause(); //Untuk Stop Video
    video.currentTime = 0; // Reset video 
}