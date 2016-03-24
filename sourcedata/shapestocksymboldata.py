import json
from random import randrange, uniform

def shape(item):
	return {
	    "name": item['Name'],
	    "symbol": item['symbol'],
	    "image": item['symbol'] + '.jpg',
	    "low": float(item['DaysLow']),
	    "ave": (float(item['DaysLow']) + float(item['DaysHigh']))/2,
	    "high": float(item['DaysHigh']),
	    "hasIncreased": item['ChangeinPercent'][0] == "+",
	    "current": float(item['Ask']) if item['Ask'] else (float(item['DaysLow']) + float(item['DaysHigh']))/2,
	    "percentageChange": item['ChangeinPercent'],
	    "likes": "{0:.1f} K".format(uniform(1, 100)),
	    "nopes": "{0:.1f} K".format(uniform(1, 100)),
	  }


jsonFile = open('stocksymbolrawdata.json', 'r')
jsonDataStr = jsonFile.read()
jsonFile.close()

jsonDataObj = json.loads(jsonDataStr)
shapedItems = []
for item in jsonDataObj['query']['results']['quote']:
	shapedItems.append(shape(item))

print shapedItems
jsonFile = open('trendingData.json', 'w')
jsonFile.write(json.dumps(shapedItems))
jsonFile.close()
