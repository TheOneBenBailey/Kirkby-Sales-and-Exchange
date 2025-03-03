(function () {

    let domain = "https://medpokerparty.com";
    // Function to load CSS styles
    function loadStylesheet(url) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        link.type = "text/css";
        return link;
    }

    const getOrdinal = (day) => {
        const suffixes = ["th", "st", "nd", "rd"];
        const value = day % 100;
        return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
    };

    const formatTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('-');
        const date = new Date(`${year}-${month}-${day}`);

        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        let formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);

        // Replace day with ordinal suffix
        formattedDate = formattedDate.replace(/\d+/, (day) => day + getOrdinal(day));

        return formattedDate;
    };

    const formatCurrency = (num) => {
        if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`.replace('.0', '');
        if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`.replace('.0', '');
        return num;
    };

    const formatLateReg = (day) => {
        return day.lateReg ? formatTime(day.lateReg.date) : 'N/A';
    };

    const nameGeneration = (name, day, flight, turbo) => {
        let nameString = name;

        if(day  == 'Final Day') {
            nameString += ' ' + day;
        } else if(day) {
            nameString += ' ' + day;
            if(flight) {
                nameString += flight;
            }
        }

        if(turbo) {
            nameString += ' Turbo';
        }

        return nameString;
    };

    // Fetch data from the API
    async function fetchData() {
        try {
            const response = await fetch(domain + "/api/data");

            if (!response.ok) {
                throw new Error("Failed to fetch data from the API.");
            }

            const data = await response.json();

            // Select the existing <kse-schedule> element
            const mppSchedule = document.querySelector("kse-schedule");

            if (mppSchedule) {
                // Create a shadow root on the kse-schedule element
                const shadowRoot = mppSchedule.attachShadow({ mode: "open" });

                // Load the external CSS into the shadow DOM
                const googleFont = loadStylesheet("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");
                const tailwind = loadStylesheet(domain + "/tailwind.css");
                const stylesheet = loadStylesheet(domain + "/embed.css");
                shadowRoot.appendChild(googleFont);
                shadowRoot.appendChild(tailwind);
                shadowRoot.appendChild(stylesheet);

                let jsonData = JSON.stringify(data, null, 2);

                // Inject the fetched data into the shadow DOM
                shadowRoot.innerHTML += `
                    <div class="relative w-full">
                        <div class="w-full max-w-[1400px] m-auto relative">
                            <div class="hidden lg:grid w-full bg-mpp font-bold grid-cols-11 gap-3 py-4 px-6 rounded-t-lg text-sm text-white uppercase text-center sticky top-20 lg:top-36 z40 relative">
                                <div class="h-max my-auto text-left font">Start</div>
                                <div class="h-max my-auto text-left">Late Reg</div>
                                <div class="col-span-4 h-max my-auto text-left">Event</div>
                                <div class="h-max my-auto text-left">Buy-in + fee</div>
                                <div class="h-max my-auto">GTE</div>
                                <div class="h-max my-auto">Clock</div>
                                <div class="h-max my-auto">Chips</div>
                                <div class="h-max my-auto">Format</div>
                            </div>`;

                // We need to run the for each loop in here.
                for (const [index, [date, tournaments]] of Object.entries(data.data).entries()) {

                    if( index !== 0) {
                        shadowRoot.innerHTML += `<div class="w-full h-[2px] col-span-12 bg-kse-dark max-w-[1400px] mx-auto"></div>`;
                    }

                    shadowRoot.innerHTML += `
                    <div class="w-full lg:grid grid-cols-12 gap-4 py-4 px-6 text-sm text-white uppercase text-center text-black bg-gradient-to-b from-mpp/10 max-w-[1400px] m-auto">
                        <div class="col-span-12 md:text-lg text-left text-mpp font-bold">${formatDate(date)}</div>`;

                    tournaments.forEach((tournament, tournamentIndex) => {
                        if (tournamentIndex !== 0) {
                            shadowRoot.innerHTML += `<div class="w-full h-[1px] col-span-12 bg-mpp max-w-[1400px] mx-auto my-4"></div>`;
                        }

                        let boldClass = tournament.tournament.highlightTournament ? 'font-bold' : '';

                        let lateRegFormatted = tournament.lateReg ? formatTime(tournament.lateReg.date) : 'N/A';
                        let livestream = tournament.liveStreamUrl
                            ? `<a href="${tournament.liveStreamUrl}" class="text-center text-[8px] h-[20px] bg-gradient-to-tr from-red-700 to-red-500 px-2 rounded-lg uppercase font-bold text-white hover:from-red-500 hover:to-red-700 duration-200 cursor-pointer" target="_blank">Watch Live</a>`
                            : '';

                        let livestreamMobile = tournament.liveStreamUrl
                            ? `<a href="${tournament.liveStreamUrl}" class="px-5 py-2 bg-mpp text-white rounded-lg uppercase font-bold tracking-wider hover:bg-kse-dark duration-200 cursor-pointer w-max text-lg lg:hidden  !text-sm text-center bg-gradient-to-tr from-red-700 to-red-500 px-2 rounded-lg uppercase font-bold text-white hover:from-red-500 hover:to-red-700 duration-200 cursor-pointer" target="_blank">Watch Live</a>`
                            : '';

                        // Add the toggle button with data-index
                        shadowRoot.innerHTML += `
                            <button class="toggle-btn px-5 h-max my-auto text-left text-lg lg:text-xl lg:hidden mt-3 w-full flex text-black mb-2 max-w-[1400px] m-auto"
                                data-index="${index}-${tournamentIndex}">
                                <div class="grow ${boldClass}">
                                    ${nameGeneration(tournament.tournament.tournamentName, tournament.dayValue, tournament.flight, tournament.turbo)}
                                </div>
                                <div class="toggle-arrow rotate180"><img src="${domain}/arrow.png" class="duration-200 drop-shadow-2xl h-6" alt="Event Details"></div>
                            </button>
                        `;

                        // Add the content div with a matching data-index and default it to hidden
                        shadowRoot.innerHTML += `
                            <div class="toggle-content hidden col-span-12 grid-cols-11 text-black flex flex-col lg:grid gap-3 row max-w-[1400px] m-auto px-5 text-center text-sm my-4"
                                data-index="${index}-${tournamentIndex}">
                                <div class="h-max my-auto text-left"><span class="font-bold text-mpp lg:hidden mr-2">Start: </span>${formatTime(tournament.date.date)}</div>
                                <div class="h-max my-auto text-left"><span class="font-bold text-mpp lg:hidden mr-2">Late reg: </span>${lateRegFormatted}</div>
                                <div class="h-max my-auto text-left gap-2 col-span-4 h-max my-auto hidden lg:flex flex-wrap">
                                    <a class="text-left cursor-pointer text-mpp hover:underline duration-200 ${boldClass}" href="${domain}/schedule?openedEvent=${tournament.id}" target="_blank">
                                        ${nameGeneration(tournament.tournament.tournamentName, tournament.dayValue, tournament.flight, tournament.turbo)}
                                    </a>
                                    ${livestream}
                                </div>
                                <div class="h-max my-auto text-left">
                                    <span class="font-bold text-mpp lg:hidden mr-2">Buy-in + Fee: </span> $${tournament.tournament.buyInAmount}
                                    <span>+</span>
                                    <span class="text-xs">$${tournament.tournament.regFeeAmount}</span>
                                </div>
                                <div class="h-max my-auto max-lg:text-left"><span class="font-bold text-mpp lg:hidden mr-2">GTE: </span>
                                    ${formatCurrency(tournament.tournament.gte)}
                                </div>
                                <div class="h-max my-auto max-lg:text-left"><span class="font-bold text-mpp lg:hidden mr-2">Clock: </span>${tournament.clock}</div>
                                <div class="h-max my-auto max-lg:text-left"><span class="font-bold text-mpp lg:hidden mr-2">Chips: </span>${formatCurrency(tournament.tournament.startingStack)}</div>
                                <div class="h-max my-auto max-lg:text-left"><span class="font-bold text-mpp lg:hidden mr-2">Format: </span>${tournament.format}</div>
                                ${livestreamMobile}
                                <a class="h-max px-5 py-2 bg-mpp text-white rounded-lg uppercase font-bold tracking-wider hover:bg-kse-dark duration-200 cursor-pointer w-max text-lg lg:hidden flex gap-2 !text-sm" href="${domain}/schedule?openedEvent=${tournament.id}" target="_blank">
                                    <div>More details</div>
                                </a>
                            </div>
                        `;
                    });

                    shadowRoot.innerHTML += `</div>`;
                }

                shadowRoot.innerHTML += `</div>
                    
                        <div class="w-full opacity-50 text-sm italic max-w-[1400px] m-auto pb-10 md:pb-28">
                            <ul class="space-y-1 list-disc pl-5 pt-2 border-t-2">
                                <li>All events will use shot clocks from the start.</li>
                                <li>Turbo Day 1s will be run as 6-Max if capacity allows.</li>
                                <li>For events with a $25K buy-in or higher, 2% of the prize pool will be withheld for operational and marketing costs.</li>
                                <li>For events with a buy-in below $25K, 4% of the prize pool will be withheld for operational and marketing costs.</li>
                                <li>Management may adjust levels and reserves the right to amend structures or the schedule.</li>
                                <li>Satellite seats are designated for specific days and will be in play at the start of the target day.</li>
                                <li>Guarantees apply before any bounties or deductions.</li>
                                <li>Please check out the rules for this event by <a href="https://meritpoker.com/poker-rules/" target="_blank" class="text-mpp hover:text-yellow-400 cursor-pointer">clicking here</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
               `;

                setTimeout(() => {
                    const toggleButtons = shadowRoot.querySelectorAll('.toggle-btn');

                    toggleButtons.forEach(button => {
                        button.addEventListener('click', (event) => {
                            let index = button.getAttribute('data-index');
                            let content = shadowRoot.querySelector(`.toggle-content[data-index="${index}"]`);
                            let arrow = button.querySelector('.toggle-arrow');

                            if (content) {
                                content.classList.toggle('hidden');
                                arrow.classList.toggle('rotate180');
                            }
                        });
                    });
                }, 100);


            } else {
                console.log("<kse-schedule> not found on the page.");
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    }

    // Define the custom kse-schedule element
    class MPPSchedule extends HTMLElement {
        constructor() {
            super();
        }
    }

    // Define the custom element with a hyphen (valid custom element name)
    customElements.define("kse-schedule", MPPSchedule);

    // Fetch data and render the content
    fetchData();

    // Wait for the Shadow DOM to rende

})();
