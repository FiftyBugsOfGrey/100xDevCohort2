/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let transactionsObj = {}
  let transactionsSummaryArray = [];
  transactions.forEach(transaction => {
    if (!transactionsObj[transaction.category]) transactionsObj[transaction.category] = 0;
    transactionsObj[transaction.category] += transaction.price;
  })

  for (let [key, value] of Object.entries(transactionsObj)) {
    transactionsSummaryArray.push({
      category: key,
      totalSpent: value
    })
  }

  return transactionsSummaryArray;
}

module.exports = calculateTotalSpentByCategory;