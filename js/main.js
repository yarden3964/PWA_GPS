window.addEventListener("DOMContentLoaded", function () {
    // אירועי לחיצה
    document.getElementById('find-me').addEventListener('click', geoFindMe);
    document.getElementById('shareBtn').addEventListener('click', share);

    // לינק לשיתוף, ללא הטמעה
    let linktoshare = "";

    // משתנים גלובלים של האלמנטים
    const loadStatus = document.getElementById('status');
    const mapLink = document.getElementById('map-link');
    const iframe = document.getElementById('iframe');

    // פונקציה שמופעלת בעת לחיצה על כפתור הצגת המיקום שלי
    function geoFindMe() {
        // איפוס הלינק למיקום וה-iframe
        mapLink.href = '';
        mapLink.textContent = '';
        iframe.src = '';
        iframe.classList.add("d-none");

        // בדיקה האם הדפדפן תומך ב-GPS
        if (navigator.geolocation) {
            // אם כן - הצגת סטטוס טעינה
            loadStatus.textContent = 'Locating…';
            // מציאת המיקום - במידה ונמצא: הפעלת פונקציית Success, במידה ולא: הפעלת פונקציית error
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            loadStatus.textContent = 'Geolocation is not supported by your browser';
        }

    }

    function success(position) {
        // במידה ונמצא מיקום הוא מועבר כפרמטר לפונקציה ואנו שולפים את קווי הרוחב והגובה
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // נעלים את סטטוס הטעינה
        loadStatus.textContent = '';

        //על סמך קווי הגובה והרוחב שמצאנו ניצור לינק להטמעה ולינק לשיתוף
        const linktoembed = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`;
        linktoshare = `https://maps.google.com/?q=${latitude},${longitude}`;
        // נשים את הלינק להטמעה כמקור של ה-iframe
        iframe.src = linktoembed;
        // נציג את ה-iframe
        iframe.classList.remove("d-none");

        // נוסיף את תוכן הלינק עם קווי הרוחב והגובה ואת הלינק לשיתוף שייפתח את המפה בחלון חדש
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
        mapLink.href = linktoshare;
    }

    function error() {
        loadStatus.textContent = 'Unable to retrieve your location';
    }

    // הפעלת פונקציית שיתוף 
    function share() {
        if (navigator.canShare) {
            navigator.share({
                title: 'שיתוף המיקום שלי',
                text: linktoshare,
            })
        }
    }

})


