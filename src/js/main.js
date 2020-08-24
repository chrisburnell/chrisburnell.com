/*!
 * Helpers
 * @author Chris Burnell <me@chrisburnell.com>
 */

helpers = {
    ////
    /// Injects content into template using placeholder
    /// @param {String} originalContent
    /// @param {String} injection
    /// @param {String} placeholder
    /// @return {String} injected content
    ////
    injectContent: (originalContent, placeholder, injection, flags = "g") => {
        const PATTERN = new RegExp(placeholder, flags);

        return originalContent.replace(PATTERN, injection);
    },

    ////
    /// Gets query string parameter
    /// @see Taken from `http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript`
    /// @param {String} name
    /// @return {String} parameter value
    ////
    getParameterByName: name => {
        const regex = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search);

        return regex && decodeURIComponent(regex[1].replace(/\+/g, " "));
    },

    ////
    /// Enable a button
    /// @param {Element} element
    /// @param {Function} action
    /// @return false
    ////
    enableElement: (element, action) => {
        if (element !== null) {
            element.disabled = false;
            element.setAttribute("aria-disabled", "false");
            if (action) {
                element.addEventListener("click", action);
            }
        }
    },

    ////
    /// Format a Date
    /// @param {String} date
    /// @return {String} formattedDate
    ////
    formatDate: (date, includeWeekday = false) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = date.getDate();
        if (day < 10) {
            day = `0${day}`;
        }
        let month = months[date.getMonth()];
        let year = date.getFullYear();

        let weekday = includeWeekday ? `${weekdays[date.getDay()]} ` : "";

        return `${weekday}${day} ${month} ${year}`;
    },

    ////
    /// Format a Time
    /// @param {Date} date
    /// @param {Boolean} [false] includeSeconds
    /// @param {Boolean} [true] includeMerdiem
    /// @return {String} formattedTime
    ////
    formatTime: (date, includeSeconds = false, includeMeridiem = true) => {
        let hours = date.getHours();
        let minutes = `:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
        let seconds = includeSeconds ? `:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}` : "";
        let meridiem = includeMeridiem ? ` ${hours < 12 ? "am" : "pm"}` : "";

        // format from 24-hours to 12-hours if including meridiem
        hours = includeMeridiem ? hours % 12 || 12 : hours;

        return `${hours}${minutes}${seconds}${meridiem}`;
    },

    ////
    /// Action from Hash
    /// @param {Array} hashes
    /// @param {Function} action
    /// @return false
    ////
    actionFromHash: (hashes, action) => {
        for (let hash of hashes) {
            if (window.location.hash.indexOf(hash) !== -1) {
                action();
            }
        }
    },

    ////
    /// Ensure fetch response is OK
    /// @param {Object} response
    /// @return {Object} response
    /// @throw {Object} error
    ////
    getFetchResponse: response => {
        if (response.ok) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    },

    ////
    /// Return a frequency based on starting key and interval
    /// @param {Number} keyStart [49]
    /// @return {Number} frequency
    ////
    getFrequencyFromKeys: (key = 49) => {
        return 2 ** ((key - 49) / 12) * 440;
    },

    ////
    /// Return a frequency based on starting key and interval
    /// @param {Number} keyStart [49]
    /// @param {Number} keyInterval [0]
    /// @return {Number} frequency
    ////
    padWithZeroes: (number, integersMax = 2) => {
        const [integers, decimals] = number.toString().split(".");
        return integers.toString().padStart(integersMax, "0") + (decimals ? `.${decimals}` : "");
    },

    ////
    /// Reliably extract text from HTML
    /// @param {String} html
    /// @return {String} text
    ////
    decodeHTML: html => {
        let text = document.createElement("textarea");
        text.innerHTML = html;
        return text.value;
    },

    ////
    /// Truncate text to n words
    ////
    truncate: (string, maximum = 10) => {
        let array = string.trim().split(" ");
        let ellipsis = array.length > maximum ? "…" : "";
        return (
            array
                .slice(0, maximum)
                .join(" ")
                .replace(/[\,\.\;]$/, "") + ellipsis
        );
    },

    since: (datetime) => {
        const today = Math.floor(Date.now() / 1000);
        const compare = Math.floor(datetime.getTime() / 1000);
        const difference = Math.abs(compare - today);

        const minute = 60;
        const hour = 60 * minute;
        const day = 24 * hour;
        const week = 7 * day;
        const month = 30.436875 * day;
        const year = 12 * month;

        const rtf = new Intl.RelativeTimeFormat("en", {
            localeMatcher: "best fit", // other values: "lookup"
            numeric: "always", // other values: "auto"
            style: "long" // other values: "short" or "narrow"
        });

        if (difference < minute * 2) {
            return "just moments ago";
        } else if (difference < hour * 2) {
            return rtf.format(Math.ceil((compare - today) / minute), "minute");
        } else if (difference < day * 2) {
            return rtf.format(Math.ceil((compare - today) / hour), "hour");
        } else if (difference < week * 2) {
            return rtf.format(Math.ceil((compare - today) / day), "day");
        } else if (difference < month * 2) {
            return rtf.format(Math.ceil((compare - today) / week), "week");
        } else if (difference < year * 2) {
            return rtf.format(Math.ceil((compare - today) / month), "month");
        }
        return rtf.format(Math.ceil((compare - today) / year), "year");
    },

    ////
    /// Wilson Score Interval
    /// @see https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval#Wilson_score_interval
    /// @param {Number} positive items
    /// @param {Number} total items
    /// @return {Object} confidence percentages
    ////
    wilson: (positive, total) => {
        if (total === 0) {
            return {
                left: 0,
                right: 0
            };
        }

        // phat is the proportion of successes in a Bernoulli trial process
        const phat = positive / total;

        // z is 1-alpha/2 percentile of a standard normal distribution for error alpha = 5%
        const z = 1.96;

        // implement the algorithm
        const a = phat + (z * z) / (2 * total);
        const b = z * Math.sqrt((phat * (1 - phat) + (z * z) / (4 * total)) / total);
        const c = 1 + (z * z) / total;

        return {
            left: (a - b) / c,
            right: (a + b) / c
        };
    }
};
/*!
 * Navigator
 * @author Chris Burnell <me@chrisburnell.com>
 */

(() => {
    "use strict";

    const notification = document.querySelector(".notification");

    let updateNotification = (text, type = "positive") => {
        notification.innerHTML = text;
        notification.classList.add(`notification--${type}`);
        notification.hidden = false;
        setTimeout(() => {
            notification.hidden = true;
            notification.classList.remove(`notification--${type}`);
        }, 5250);
    };

    let updateNetwork = () => {
        if (navigator.onLine) {
            console.log("You have regained your network connection.");
            notification.innerHTML = "👍 You have regained your network connection.";
            notification.classList.add("notification--positive");
        } else {
            console.log("You have lost your network connection.");
            notification.innerHTML = "👎 You have lost your network connection.";
            notification.classList.add("notification--negative");
        }
        notification.hidden = false;
        setTimeout(() => {
            notification.hidden = true;
            notification.classList.remove("notification--positive", "notification--negative");
        }, 5250);
    };

    if (!!navigator.serviceWorker) {
        navigator.serviceWorker
            .register("/serviceworker.js")
            .then(registration => {
                console.log("ServiceWorker registration successful with scope:", registration.scope);
                let serviceWorker;
                if (registration.installing) {
                    serviceWorker = registration.installing;
                } else if (registration.waiting) {
                    serviceWorker = registration.waiting;
                } else if (registration.active) {
                    serviceWorker = registration.active;
                }
                if (serviceWorker) {
                    serviceWorker.addEventListener("statechange", () => {
                        if (registration.active && !navigator.serviceWorker.controller) {
                            updateNotification("👍 Cached and ready to go offline.", "positive");
                        }
                    });
                }
            })
            .catch(err => {
                console.log("ServiceWorker registration failed:", err);
            });
        window.addEventListener("load", () => {
            window.addEventListener("online", updateNetwork);
            window.addEventListener("offline", updateNetwork);
            if (!!navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    command: "trimCaches"
                });
            }
        });
    } else {
        console.log("ServiceWorkers are not supported in your browser.");
    }

    if (!!navigator.share) {
        navigator
            .share({
                title: document.querySelector("title").textContent,
                url: document.querySelector("link[rel='canonical']").getAttribute("href")
                // breaks in iOS, copies text to clipboard instead of URL
                // text: document.querySelector("meta[name='description']").getAttribute("content")
            })
            .then(() => {
                console.log("Successfully shared the page");
            })
            .catch(error => {
                console.log("Error sharing the page", error);
            });
    }
})();
(() => {
    "use strict";

    const STORAGE_KEY = "user-color-scheme";
    const COLOR_SCHEME_KEY = "--color-scheme";

    const schemeToggleButton = document.querySelector(".js-color-scheme-toggle");
    const schemeStatusText = document.querySelector(".js-color-scheme-status");

    const getCSSCustomProp = propKey => {
        let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

        if (response.length) {
            response = response.replace(/\"/g, "").trim();
        }

        return response;
    };

    const applySetting = passedSetting => {
        let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

        if (currentSetting) {
            document.documentElement.setAttribute("data-user-color-scheme", currentSetting);
            schemeStatusText.innerText = `Enable ${currentSetting === "dark" ? "Light" : "Dark"} Mode`;
        }
        else {
            schemeStatusText.innerText = `Enable ${getCSSCustomProp(COLOR_SCHEME_KEY) === "dark" ? "Light" : "Dark"} Mode`;
        }
    };

    const toggleSetting = () => {
        let currentSetting = localStorage.getItem(STORAGE_KEY);

        switch (currentSetting) {
            case null:
                currentSetting = getCSSCustomProp(COLOR_SCHEME_KEY) === "dark" ? "light" : "dark";
                break;
            case "light":
                currentSetting = "dark";
                break;
            case "dark":
                currentSetting = "light";
                break;
        }

        localStorage.setItem(STORAGE_KEY, currentSetting);

        return currentSetting;
    };

    schemeToggleButton.addEventListener("click", event => {
        event.preventDefault();

        applySetting(toggleSetting());
    });

    applySetting();

})();
/*!
 * Target and build Sparklines
 */

(function() {
    "use strict";

    ///
    // Canvas Sparkline
    // by Jeremy Keith <@adactio>, modified by Chris Burnell <me@chrisburnell.com>
    // https://github.com/adactio/Canvas-Sparkline
    // Licensed under a CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
    // http://creativecommons.org/publicdomain/zero/1.0/
    ///
    let buildSparkline = (canvasID, data, endpoint = true, color = "hsla(0, 0%, 31%, 1)", endpointColor = "hsla(357, 83%, 55%, 0.5)") => {
        if (window.HTMLCanvasElement) {
            var c = document.getElementById(canvasID),
                ctx = c.getContext("2d"),
                height = c.height - 3,
                width = c.width,
                total = data.length,
                max = Math.max.apply(Math, data),
                xStep = width / total,
                yStep = max / height,
                x = 0,
                y = height - data[0] / yStep,
                dX,
                dY,
                i;
            if (window.devicePixelRatio) {
                c.width = c.width * window.devicePixelRatio;
                c.height = c.height * window.devicePixelRatio;
                // c.style.width = `${c.width / window.devicePixelRatio}px`;
                // c.style.height = `${c.height / window.devicePixelRatio}px`;
                ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            }
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.moveTo(x, y);
            for (i = 0; i < total; i = i + 1) {
                dX = x;
                dY = y;
                x = x + xStep;
                y = height - data[i] / yStep + 2;
                dX = (dX + x) / 2;
                if (y > dY) {
                    dY = ((dY + y) / 3) * 2;
                } else if (y < dY) {
                    dY = (dY + y) / 3;
                }
                // ctx.quadraticCurveTo(x, y, dX, dY);
                ctx.lineTo(x, y);
            }
            ctx.stroke();
            if (endpoint) {
                ctx.beginPath();
                ctx.fillStyle = endpointColor;
                ctx.arc(x - 1, y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    };

    ///
    // Play Sparkline
    // Pass in an array of numbers ranging from 0 to 12.
    // by Jeremy Keith <@adactio>, modified by Chris Burnell <me@chrisburnell.com>
    // https://gist.github.com/adactio/d988edc418aabfa2220456dc548dedc1
    // Licensed under a CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
    // http://creativecommons.org/publicdomain/zero/1.0/
    ///
    let playSparkline = (notes, frequencies = [440], duration = 3000, wave = "sine", volume = 0.5) => {
        if (!window.AudioContext && !window.webkitAudioContext) {
            return;
        }
        let playing;
        let note = 0;
        let noteLength = Math.floor(duration / notes.length);
        let output = new (window.AudioContext || window.webkitAudioContext)();
        let instrument = output.createOscillator();
        let amplifier = output.createGain();
        let playNotes = () => {
            if (note < notes.length) {
                instrument.frequency.value = frequencies[notes[note]];
                note = note + 1;
            } else {
                amplifier.gain.value = 0;
            }
            playing = window.setTimeout(playNotes, noteLength);
        };
        instrument.type = wave;
        instrument.start();
        instrument.connect(amplifier);
        amplifier.gain.value = volume;
        amplifier.connect(output.destination);
        playNotes();
    };

    let notes = {},
        type;
    if (document.querySelector(".sparkline")) {
        for (let sparkline of document.querySelectorAll(".sparkline")) {
            if (sparkline.hasAttribute("data-values")) {
                type = sparkline.id.replace("sparkline-", "");
                notes[type] = sparkline.getAttribute("data-values").split(",");
                buildSparkline(`sparkline-${type}`, notes[type]);
            }
        }
    }

    let wave = "triangle"; // "sine", "square", "sawtooth", "triangle"
    let duration = 4000; // milliseconds
    let keyStart = 41; // C♯4 / D♭4
    let keyIntervals = [2, 3, 2, 2, 3]; // https://en.wikipedia.org/wiki/Pentatonic_scale
    let keyInterval = 0;
    let keyCount = 12;
    let frequencies = [helpers.getFrequencyFromKeys(keyStart)];

    for (let count = 0; count < keyCount; count++) {
        keyInterval = keyInterval + keyIntervals[count % keyIntervals.length];
        frequencies.push(helpers.getFrequencyFromKeys(keyStart + keyInterval));
    }

    for (let sparkline of document.querySelectorAll(".sparkline")) {
        sparkline.addEventListener("click", () => {
            playSparkline(notes[sparkline.id.replace("sparkline-", "")], frequencies, duration, wave);
            // Prevent the user from blowing their ears up by stacking sounds
            sparkline.classList.add("non-interactive");
            window.setTimeout(() => {
                sparkline.classList.remove("non-interactive");
            }, duration);
        });
    }
})();
/*!
 * Format a datetime into a relative format
 */

(() => {
    "use strict";

    const timeElements = document.querySelectorAll(".since");

    let date;
    for (let timeElement of timeElements) {
        date = new Date(timeElement.getAttribute("datetime"));
        timeElement.setAttribute("title", date.toString());
        timeElement.innerHTML = helpers.since(date);
    }
})();
(() => {
    "use strict";

    document.documentElement.classList.remove("no-js");

    console.log("%cRAVEN", "color: #507791");
    console.log("%c  OUSRAV", "color: #507791");
    console.log("%c    ENOUSRA", "color: #507791");
    console.log("%c      VENOUSRA", "color: #507791");
    console.log("%c       VENOUSR", "color: #507791");
    console.log("%c       AVENOUSR               A", "color: #507791");
    console.log("%c        VENOUSR             A VE", "color: #507791");
    console.log("%c        NOUSRAVE         NO USRA V", "color: #507791");
    console.log("%c         ENOUSRAV     ENOUSRAVENOU", "color: #507791");
    console.log("%c          SRAVENOUSRAVENOUSRAVENOU", "color: #507791");
    console.log("%c           SRAVENOUSRAVENOUSRAVENO", "color: #507791");
    console.log("%cUSR      AVENOUSRAVENOUSRAVENOUSRA", "color: #507791");
    console.log("%c VENOUSRAVENOUSRAVENOUSRAVEN", "color: #507791");
    console.log("%c  OUSRAVENOUSRAVENOUSRAVEN", "color: #507791");
    console.log("%c   OUSRAVENOUSRAVENOUSRAV", "color: #507791");
    console.log("%c     ENOUSRAVENOUSRAVEN" + "%cO" + "%cUS", "color: #507791", "color: #eb2d37", "color: #507791");
    console.log("%c            RAVEN     OUS", "color: #507791");
    console.log("%c          RAVEN        OU", "color: #507791");
    console.log("%c         SR AV", "color: #507791");
    console.log("%c            EN", "color: #507791");
    console.log(" ");
    console.log("%cChecking out the source code, eh?", "color: #507791");
    console.log("%cGet in touch with me if you want to know more about the code, or if you want to use a snippet of code on a project of your own!", "color: #507791");
})();
