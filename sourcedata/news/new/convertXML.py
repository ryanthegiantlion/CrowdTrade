import xmltodict, json, sys, os
from urlparse import urlparse

# sources = set()
sources = {
	'usatoday': 'USA Today',
	'cnbc': 'CNBC',
	'investors': 'Investors.com',
	'kiplinger': 'KipLinger.com',
	'capitalcube': 'CapitalCube.com',
	'insidermonkey': 'Insider Monkey',
	'investopedia': 'Investopedia',
	'publicnow': 'PublicNow.com',
	'marketwatch': 'Market Watch',
	'siliconbeat': 'Silicon Beat',
	'forbes': 'Forbes',
	'barrons': 'Barrons',
	'thestreet': 'TheStreet.com',
	'fool': 'Fool.com',
	'bizjournals':'BizJournas.com',
	'ft': 'Financial Times',
	'rigzone': 'RigZone.com',
	'latimes': 'LA Times',
	'yahoo': 'Yahoo',
	'bloomberg': 'Bloomberg',
	'247wallst': '347WallSt.com',
	'morningstar':'Morning Star',
	'fortune': 'Fortune',
	'wsj': 'Wall Street Journal',
	'bloombergview': 'Bloomberg',
	'time': 'Time.com',
	'mercurynews':'Mercury News',
	'moodys': 'Moodys.com'
}
# remove the redirect from yahoo finance url's
# e.g url: http://us.rd.yahoo.com/finance/external/mfool/rss/SIG=12vpa4efl/*http://www.fool.com/investing/general/2016/03/23/1-reason-amazon-may-want-googles-robots.aspx?source=yahoo-2&amp;utm_campaign=article&amp;utm_medium=feed&amp;utm_source=yahoo-2
def stripUrl(url):
	return url.split('*')[1]

def getSource(url):
	url = stripUrl(url)
	source = urlparse(url).netloc.split('.')[-2]
	# sources.add(source)
	# return source
	return sources[source]


def shape(item, filename):
	shapedData = [{
		'symbol': os.path.splitext(filename)[0][2:],
		'title': i['title'], 
		'description': i['description'], 
		'url': stripUrl(i['link']), 
		'source': getSource(i['link']),
		'date': i['pubDate']} for i in item['rss']['channel']['item']]
	# print shapedData
	return shapedData

items = []
for line in sys.stdin:
	line = line.rstrip()
	xmlFile = open(line, 'r')
	o = xmltodict.parse(xmlFile.read())
	xmlFile.close()
	# jsonStr = json.dumps(o) 
	items.extend(shape(o, line))

jsonFile = open('news.json', 'w')
jsonFile.write(json.dumps(items))
jsonFile.close()
# print sources