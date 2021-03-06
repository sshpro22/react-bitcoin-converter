# Bitcoin Conversion

In this app, user inputs the name and select the currency.
Then it converts the chosen currency into the BITCOIN.
User can see the conversion result and navigation to the other screen is available.

![](https://user-images.githubusercontent.com/52404115/61911315-28758b00-af05-11e9-939c-6c317b21618f.gif)

## Structure && Description

Used the react wizard form.
Divided into 3 steps.

### 1. UserName Step. 

  First, once the user inputs the username and then,
  this persists the user name without using a database(localstorage used).
  
  So after close and reopen the WebPage, it takes the user directly to the second screen
  without asking the username again.

  Takes the user into the second screen.

### 2. Select Currency

  Lists all currencies from 3rd party API [https://apiv2.bitcoinaverage.com](https://apiv2.bitcoinaverage.com/constants/exchangerates/global).
  It is available to search and scroll.

  User selects the currency he wants to convert and confirms.
  Then it navigates to the second screen.

### 3. Present Conversion Result

  It shows how much 1 BTC is converted into the chosen currency.
  User is able to navigate back to the second screen.
  (Not only when clicking the button but also after reopening the minimized window.)

## Installation and Running

Use the package manager npm.
```bash
npm install
npm start
```


