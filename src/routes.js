import Trending from './components/trending/index';
import News from './components/news/index';
import WatchList from './components/watchlist/index';
import CrowdChoice from './components/crowdchoice/index';
import CrowdChat from './components/crowdchat/index';
import Settings from './components/settings/index';

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
  crowdchoice: {
    Page: CrowdChoice
  },
  crowdchat: {
    Page: CrowdChat
  },
  settings: {
    Page: Settings
  }
};

module.exports = Routes 