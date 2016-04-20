export default function initialState() {
  var trendingData = require('./data/trending/stocks.json');
  var watchListData = require('./data/watchlist/stocks.json')
  var newsData = require('./data/news/news.json')
  var crowdChatData = require('./data/crowdchat/chats.json')
  var featuredNews = require('./data/featurednews/featurednews.json')
  var virtualPortfolioData = require('./data/virtualportfolio/virtualportfolio.json')

  return {
    ui: {isMenuShowing: false, currentRoute: 'trending', searchFilter: ''},
    uiTrending: {currentPosition: 0, isDropDownDisplayed: false},
    trending: {data: trendingData},
    watchList: {data: watchListData},
    news: {data: newsData},
    crowdChat: {data: crowdChatData},
    featuredNews: {data: featuredNews},
    virtualPortfolio: {data: virtualPortfolioData}
  }
}
