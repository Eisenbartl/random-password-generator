const output = document.getElementById('output');
const button = document.querySelector('.btn');
const copy = document.querySelector('.copy');
const list = document.querySelector('.list-frame');
const save = document.querySelector('.save');
const chevron = document.getElementById('chevron');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

// Chooses a letter
function abc() {
  const randomLetter = Math.floor(Math.random() * 26);
  const randomCase = Math.floor(Math.random() * 2);
  let letter;
  randomCase === 0? letter = alphabet[randomLetter].toLowerCase(): letter = alphabet[randomLetter].toUpperCase();
  return letter;
}

// Outputs an Uppercase letter
function upperCase() {
  const randomLetter = Math.floor(Math.random() * 26);
  return alphabet[randomLetter].toUpperCase();
}
// Outputs a Lowercase Letter
function lowerCase() {
  const randomLetter = Math.floor(Math.random() * 26);
  return alphabet[randomLetter].toLowerCase();
}

function symbol() {
  return ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'][Math.floor(Math.random() * 10)];
}

function createPass() {
  let arr = [];
  for(i = 0; i < 12; i++) {
  Math.floor(Math.random() * 2) === 0? arr.push(abc()): arr.push(Math.floor(Math.random() * 10));
  }

  arr.splice(Math.floor(Math.random() * 17), 0, upperCase());
  arr.splice(Math.floor(Math.random() * 17), 0, lowerCase());
  arr.splice(Math.floor(Math.random() * 17), 0, Math.floor(Math.random() * 10));
  arr.splice(Math.floor(Math.random() * 17), 0, symbol());

  let str = arr.toString();
  output.textContent = str.replace(/,/g, '');
  console.log(str.replace(/,/g, ''));
}
button.addEventListener('click', createPass);

// copy textarea
copy.onclick = function () {
  output.select();
  document.execCommand('Copy');
}

// List Visibility
let toggleStatus = false;

chevron.onclick = function () {
  if (toggleStatus === false) {
    document.querySelector('.list-frame').style.visibility = 'visible';
    chevron.style.transform = 'rotate(90deg)';
    toggleStatus = true;
  } else if (toggleStatus === true) {
    document.querySelector('.list-frame').style.visibility = 'hidden';
    chevron.style.transform = 'rotate(360deg)';
    toggleStatus = false;
  }
}

// List Items Class: Represents website/username/password
class Item {
  constructor(website, username, password) {
    this.website = website;
    this.username = username;
    this.password = password;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static addItemToList(item) {
    const listForm = document.getElementById('list-items');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.website}</td>
      <td>${item.username}</td>
      <td>${item.password}</td>
      <td><a href="#" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt delete"></i></a></td>
    `;

    listForm.appendChild(row);
  }

  static deleteItem(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.parentElement.remove();
    }
  }

  // static show
  static clearFields() {
    document.getElementById('add-site').value = '';
    document.getElementById('add-username').value = '';
    document.getElementById('output').textContent = '';
  }
}

// Store Class: Handles Storage

// Event: Display website/username/password
document.addEventListener('DOMContentLoaded', UI.displayItems);

// Event: Add  Display website/username/password
document.querySelector('.password-form').addEventListener('submit', (e) => {
  // Prevent Actual Submit
  e.preventDefault();

  // Get form values
  const site = document.getElementById('add-site').value;
  const username = document.getElementById('add-username').value;
  const password = document.getElementById('output').value;

  // Validate
  if (site === '' || username === '' || password === '') {
    alert('Fill in all the fields you turkey!')
  } else {
    const item = new Item(site, username, password);

  // Add Item to UI
  UI.addItemToList(item);

  // Clear Fields
  UI.clearFields();
  }
});

// Event: Remove Display website/username/password
document.getElementById('list-items').addEventListener('click', (e) => {
  UI.deleteItem(e.target);
});