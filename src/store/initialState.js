export default function initialState() {
  var trendingData = require('./data/trending/stocks.json');

  return {
    ui: {isMenuShowing: false, currentRoute: 'trending'},
    trending: {data: trendingData, currentPosition: 0}
  }
}
