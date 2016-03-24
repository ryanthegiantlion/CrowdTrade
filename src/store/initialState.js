export default function initialState() {
  var trendingData = require('./data/trending/stocks.json');
  var watchListData = require('./data/watchlist/stocks.json')
  var newsData = require('./data/news/news.json')

  return {
    ui: {isMenuShowing: false, currentRoute: 'trending'},
    uiTrending: {currentPosition: 0, isDropDownDisplayed: false},
    trending: {data: trendingData},
    watchList: {data: watchListData},
    news: {data: newsData},
  }
}
