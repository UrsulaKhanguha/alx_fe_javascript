let display = document.getElementById('quoteDisplay');
let btn = document.getElementById('newQuote');
const quotes =
[
{text: "Your limitation—it's only your imagination.", category:"Motivation"},
{text: "Push yourself, because no one else is going to do it for you.", category: "Ambition"},
{text: "Dream bigger. Do bigger."},
{text: "Hardships often prepare ordinary people for an extraordinary destiny.", category:"Resilience"},
{text: "The secret of our success is that we never, never give up.", category:"Perserverance"},
{text: "Fall seven times, stand up eight.", category:"Persistence" },
{text: "Believe in yourself and all that you are. Know that there is something inside you greater than any obstacle.", category:"Self-belief"} ,
{text: "With confidence, you have won before you have started.", category:"Confidence"} ,
{text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", category:"Courage"} ,
{text: "Perseverance is not a long race; it is many short races one after the other.", category:"Perserverance" },
{text: "Courage is not having the strength to go on; it is going on when you don’t have the strength.", category:"Courage"},
{text: "A river cuts through rock, not because of its power, but because of its persistence.", category:"Persistence"},
{text: "Act as if what you do makes a difference. It does.", category:"Motivation"},
{tex: "The best way to predict the future is to create it.", category:"Future"},
{text: "Small deeds done are better than great deeds planned.", category:"Action"},
];

function showRandomQuote(){
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay =document.getElementById("quoteDisplay");
    // generates a paragraph that contains a quote text followed by the category
    quoteDisplay.innerHTML =  `<p>"${quotes[randomIndex].text}" - <strong>${quotes[randomIndex].category}</strong></p>`;
}

function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("Quote added successfully!");
  } else {
    alert("Please enter both a quote and a category.");
  }
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);
// function addQuote(){
//     var newQuoteText = document.getElementById("newQuoteText").value;
//     var newQuoteCategory = document.getElementById("newQuoteCategory").value;
//     if (newQuoteText === "" || newQuoteCategory === "") {
//         alert("Please enter both a quote and a category.");
//       }
//       var quoteList = document.getElementById("quoteList");
//       var newQuoteItem =document.createElement("div");
//       newQuoteItem.innerHTML = "<strong>" + quoteCategory + ":</strong> " + newQuoteText;

//       quoteList.appendChild(newQuote);
//       document.getElementById(newQuoteText).value ="";
//       document.getElementById(newQuoteCategory).value = "";
//     }



