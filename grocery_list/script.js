// select the ul element. we need to append a newly created grocery list item to this ul
const ul = document.querySelector("ul");

// select the button element. we need an event listener on the button to tell when user clicks on it
const button = document.querySelector("button");

// select the input element. we need to extract what the user typed
const groceryList = [];

// add an event listener to the button
button.addEventListener('click', () => {
  // when clicking on the button, a new grocery list item should be created
  // with the text that user typed into the input field
  
  // append the grocery list item into the unordered list
  const input = document.querySelector("input");
  groceryList.push(input.value);
  render();
});

const render = () => {
  ul.replaceChildren();

  // take each item in input, and create an li fot it
  // and append it to the ul
  groceryList.forEach((groceryItem) => {
    const li = document.createElement('li');
    li.textContent = groceryItem;

    ul.appendChild(li);
  });
};
render();



