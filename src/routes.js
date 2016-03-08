import Trending from './components/trending/index';
import News from './components/news/index';
import WatchList from './components/watchlist/index';
import CrowdChat from './components/crowdchat/index';
import VirtualPortfolio from './components/virtualportfolio/index';

const Routes = {
  trending: {
    Page: Trending
  },
  news: {
    Page: News
  },
  watchlist: {
    Page: WatchList
  },
  crowdchat: {
    Page: CrowdChat
  },
  virtualportfolio: {
    Page: VirtualPortfolio
  },
};

module.exports = Routes 