const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const newQuoteBtn = document.querySelector("#new-quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const loader = document.querySelector("#loader");

let apiQuotes = [];

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// showing new quote
function newQuote() {
    loading();
    //paicking random quote from API
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //if author is unknown
    if (!quote.author || quote.author === null) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    // check quote length to set the style
    if (quote.text.length > 90) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    // set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

// getting quotes from API
async function getQuote() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // catching Error
        getQuote();
    }
}

//tweet the quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}

//event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on loading
getQuote();

