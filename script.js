const API_KEY = "aim4TUJL2GoaFT0svpTVAGLZSU2afOTJ";

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const clearBtn = document.getElementById("clearSearch");
let debounceTimer;
searchInput.addEventListener("input", function () {

    const keyword = this.value.trim();

    clearTimeout(debounceTimer);

    if (keyword.length < 2) {
        searchResults.innerHTML = "";
        searchResults.style.display = "none";
        return;
    }
    debounceTimer = setTimeout(() => {
        searchEvents(keyword);
    }, 400);
});

clearBtn.addEventListener("click", () => {

    searchInput.value = "";
    searchResults.innerHTML = "";
    searchResults.style.display = "none";
    searchInput.focus();

});
async function searchEvents(keyword) {
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${encodeURIComponent(keyword)}&apikey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        searchResults.innerHTML = "";
        if (!data._embedded || !data._embedded.events) {
            searchResults.innerHTML = `
                <div class="event-card">
                    <div class="event-details">
                        <h5>No events found</h5>
                    </div>
                </div>
            `;
            searchResults.style.display = "block";
            return;
        }
        const events = data._embedded.events;
        events.slice(0, 5).forEach(event => {
            const image = event.images[0].url;
            const name = event.name;
            const date = event.dates.start.localDate;
            const venue = event._embedded.venues[0].name;
            const city = event._embedded.venues[0].city.name;
            const ticketUrl = event.url;
            searchResults.innerHTML += `
            <a href="${ticketUrl}" target="_blank" class="event-card">
                <img src="${image}" class="event-image">
                <div class="event-details">
                    <h5>${name}</h5>
                    <p class="event-location">${venue}, ${city}</p>
                    <p class="event-date">${date}</p>
                </div>
                <button class="book-btn">
                    Book Now
                </button>
            </a>
            `;
        });
        searchResults.style.display = "block";
    } catch (error) {
        console.error(error);
    }
}
function loginUser() {

    let mobile = document.getElementById("mobile").value.trim();
    let password = document.getElementById("password").value.trim();

    if (mobile === "" || password === "") {
        alert("Please fill above details.");
        return;
    }

    // Hide Login Modal
    $("#loginModal").modal("hide");

    // Show Success Modal
    $("#successModal").modal("show");

    // Clear fields
    document.getElementById("mobile").value = "";
    document.getElementById("password").value = "";
}