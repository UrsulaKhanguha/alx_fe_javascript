// Allan Added This Below Piece From showRandomQuote Function & DOMContentLoaded EventListener//
const quoteDisplay =document.getElementById("quoteDisplay");
// Allan Moved This Above Piece From showRandomQuote Function & DOMContentLoaded EventListener//

let display = document.getElementById('quoteDisplay');

let btn = document.getElementById('newQuote');

let storedQuotes = JSON.parse(localStorage.getItem("quotes")) //retrieve quotes from local storage 
const quotes = storedQuotes || [
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
{text: "The best way to predict the future is to create it.", category:"Future"},
{text: "Small deeds done are better than great deeds planned.", category:"Action"},
];

function showRandomQuote(){
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];
    // generates a paragraph that contains a quote text followed by the category
    quoteDisplay.innerHTML =  `<p>"${selectedQuote.text}" - <strong>${selectedQuote.category}</strong></p>`;
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(selectedQuote)); //store the last viewed quote in sessionStorage
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

//user can add their own quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    localStorage.setItem("quotes", JSON.stringify(quotes)); //Saves updated quotes list to local storage
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("Quote added successfully!");
  } 
  else {
    alert("Please enter both a quote and a category.");
  }
populateCategories();
 
}
//load the last viewed quote from sessinStorage when page loads
document.addEventListener("DOMContentLoaded", () => {
  if(JSON.parse(sessionStorage.getItem("lastViewedQuote"))){
    quoteDisplay.innerHTML = `<p>"${(JSON.parse(sessionStorage.getItem("lastViewedQuote"))).text}" - <strong>${(JSON.parse(sessionStorage.getItem("lastViewedQuote"))).category || "General"}</strong></p>`;
  } 
  else {
    showRandomQuote()
  }
    document.getElementById("exportQuotes").addEventListener("click", exportQuotes);
  });



// Allan Added This Below Piece //
function exportQuotes(){
    const quotes = localStorage.getItem("quotes"); // retrieves quotes from local storage
    const myQuotes = JSON.parse(quotes); //converts the JSON strings into objects
    if(myQuotes.length > 0){
      const blob = new Blob([JSON.stringify(myQuotes)], { type: 'application/json' }); //json.stringify converts the javascript object into a js string
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'myQuotes.json';
      link.click();
      URL.revokeObjectURL(url);
    }
    else{
      quoteDisplay.innerHTML = `<p style="color: red"><strong>No Quotes to Export</strong></p>`;
    }
}
// Allan Added This Above Piece //

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }

  //function to populate categories dynamically
function populateCategories(){
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = `<option value="all'">All Categories</option>` //reset options
    //Extract unique categories from quotes array
    const categories = [...new Set(quotes.map(quote => quote.category))];

    //populate dropdown with categories
    categories.forEach(category =>{
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

     //restore last selected filter from local storage
    const savedCategory = localStorage.getItem("selectedCategory");
    if(savedCategory){
        categoryFilter.value = savedCategory;
    }
}

     //function to filter and display quotes based on the selected category
function filterQuotes(){
    const selectedCategory = document.getElementById('categoryFilter').value;
   localStorage.setItem("selctedCategory", selectedCategory);

   let filteredQuotes = quotes;
   if(selectedCategory !== "all"){
    filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
   }

   //Display the first quote from the filtered list
   if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    document.getElementById("quoteDisplay").innerHTML = `<p>"${filteredQuotes[randomIndex].text}" - <strong>${filteredQuotes[randomIndex].category}</strong></p>`;
  } else {
    document.getElementById("quoteDisplay").innerHTML = `<p>No quotes available for this category.</p>`;
  }
}

//run functions when the page loadds
document.addEventListener("DOMContentLoaded", () =>{
    populateCategories(); //populate dropdown
    filterQuotes(); //apply last selcted filter
})





