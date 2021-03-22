// const fetch = require('node-fetch');
// const getBalances = async () => {
//   const data = await fetch('http://localhost:5432/users/1/balances', {
//     headers: { 'Content-Type': 'application/json' },
//   }).then(async (response) => {
//     const balances = await response.json();
//     console.log(balances);
//     return balances;
//   });
//   // setUser(data[0].username);
// };
// // 
// // getBalances();

// const test = {
//   id: 1,
//   user_id: 1,
//   currency_symbol: 'BTC',
//   balance: 0.0,
//   date_occured: '2020-03-15T07:00:00.000Z',
// };

// const url = 'http://localhost:5432/users/1/balances';

// async function postData(url, data) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json',
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }

// postData(url, test).then((data) => {
//   console.log(data);
// });


