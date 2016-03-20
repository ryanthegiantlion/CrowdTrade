export default function initialState() {
  var trendingData = require('./data/trending/stocks.json');
  var watchListData = require('./data/watchlist/stocks.json')

  return {
    ui: {isMenuShowing: false, currentRoute: 'watchlist'},
    trending: {data: trendingData, currentPosition: 0},
    watchList: {data: watchListData},
  }
}
