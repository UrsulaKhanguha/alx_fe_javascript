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

function createAddQuoteForm() {
  // Create form elements for adding a quote
  const formContainer = document.createElement("div");

  const quoteTextInput = document.createElement("input");
  quoteTextInput.id = "newQuoteText";
  quoteTextInput.type = "text";
  quoteTextInput.placeholder = "Enter a new quote";

  const quoteCategoryInput = document.createElement("input");
  quoteCategoryInput.id = "newQuoteCategory";
  quoteCategoryInput.type = "text";
  quoteCategoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote; // Attach the addQuote function to the button click event

  // Append form elements to the form container
  formContainer.appendChild(quoteTextInput);
  formContainer.appendChild(quoteCategoryInput);
  formContainer.appendChild(addButton);

  // Append the form container to the body or another element in your HTML
  document.body.appendChild(formContainer);
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);

//user can add their own quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { id: Date.now(), text: newQuoteText, category: newQuoteCategory };
    quotes.push({ newQuote });
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
      localStorage.setItem("quotes", JSON.stringify(quotes));
      alert('Quotes imported successfully!');
      populateCategories(); // Refresh category dropdown
    };
    fileReader.readAsText(event.target.files[0]);
  }

  //function to populate categories dynamically
function populateCategories(){
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = `<option value="all">All Categories</option>` //reset options
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
   localStorage.setItem("selectedCategory", selectedCategory);

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

 // Function to display UI notifications
  function displayNotification(message) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.background = "green";
    notification.style.color = "white";
    notification.style.padding = "10px";
    notification.style.borderRadius = "5px";
    document.body.appendChild(notification);
  
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  }

 // Function to sync quotes with local storage
  function syncQuotesWithLocalStorage(serverQuotes) {
    let localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  
    // Identify new quotes
    const newQuotes = serverQuotes.filter(sq => !localQuotes.some(lq => lq.id === sq.id));
  
    if (newQuotes.length > 0) {
      localQuotes = [...localQuotes, ...newQuotes];
      localStorage.setItem("quotes", JSON.stringify(localQuotes));
      displayNotification("Quoted synced with server!");
      quotes = localQuotes; // Update in-memory quotes array
      populateCategories(); // Refresh dropdown
    }
  }
  

  // Function to resolve conflicts (server takes precedence)
  function resolveConflicts(serverQuotes) {
    let localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  
    serverQuotes.forEach(serverQuote => {
      const localQuoteIndex = localQuotes.findIndex(lq => lq.id === serverQuote.id);
  
      if (localQuoteIndex !== -1) {
        // Update local quote with the server version
        localQuotes[localQuoteIndex] = serverQuote;
      } else {
        // Add new server quote
        localQuotes.push(serverQuote);
      }
    });
      
    localStorage.setItem("quotes", JSON.stringify(localQuotes));
    displayNotification("Quotes synced with server!");
    quotes = localQuotes; // Update in-memory quotes array
    populateCategories(); // Refresh dropdown
  }
  
  // Function to fetch quotes from a mock server (JSONPlaceholder)
async function fetchQuotesFromServer() {
    try {
          const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST", //  POST request
            headers: {
                "Content-Type": "application/json" //  Specify JSON format
            },
            body: JSON.stringify({ //  Example data
                title: "New Inspirational Quote",
                category: "Motivation",
                userId: 1
            })
        });
      if (!response.ok) throw new Error("Failed to fetch quotes");
      const serverQuotes = await response.json();
  
      // Transform data to match quote structure
      const formattedQuotes = serverQuotes.map(item => ({
        id: item.id,
        text: item.title,
        category: "General"
      }));
  
      syncQuotesWithLocalStorage(formattedQuotes);
    } catch (error) {
      console.error("Error fetching quotes from server:", error);
      setTimeout(fetchQuotesFromServer, 5000); // Retry after 5 seconds
    }
  }
      
  // Run functions when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    populateCategories(); // Populate category dropdown
    filterQuotes();       // Apply last selected filter
    fetchQuotesFromServer(); // Fetch server quotes initially
  });
  
  // Periodically fetch new quotes every 60 seconds
  setInterval(fetchQuotesFromServer, 60000);
