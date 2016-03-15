export default function initialState() {
  var trendingData = require('./data/trending/stocks.json');

  return {
    trending: {data: trendingData, currentPosition: 0}
  }
}
