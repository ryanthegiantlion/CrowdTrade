export default function initialState() {
  var trendingData = require('./data/trending/stocks.json');
  var watchListData = require('./data/watchlist/stocks.json')

  return {
    ui: {isMenuShowing: false, currentRoute: 'trending'},
    uiTrending: {currentPosition: 0, isDropDownDisplayed: true},
    trending: {data: trendingData},
    watchList: {data: watchListData},
  }
}
