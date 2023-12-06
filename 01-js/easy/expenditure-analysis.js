/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  let transactionsObj = {}
  let transactionsSummaryArray = [];
  transactions.forEach(transaction => {
    if(!transactionsObj[transaction.category]) transactionsObj[transaction.category] = 0;
    transactionsObj[transaction.category] += transaction.price;
  })

  for(let [key, value] of Object.entries(transactionsObj)) {
    transactionsSummaryArray.push({ category: key, totalSpent: value })
  }

  return transactionsSummaryArray;
}

module.exports = calculateTotalSpentByCategory;
