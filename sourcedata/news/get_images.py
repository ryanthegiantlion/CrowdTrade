import requests, json

def getImage(url):
	query = {
	  "url": url,
	  "key": ":{insertkeyhere}"
	}

	r = requests.get('https://api.embedly.com/1/oembed', params=query)

	print "got image"
	lajson = r.json()
	if 'thumbnail_url' in lajson:
		return r.json()['thumbnail_url']
	else:
		print "f, f, f, faaa, faaaail !!!!!!!!"
		return None

newsWithoutImages = open("news.json", 'r')
newsWithImages = open("newswithimages.json", 'w')

news = newsWithoutImages.read()
# print news

newsjson = json.loads(news)

for item in newsjson:
	item['image'] = getImage(item['url'])

newsWithImages.write(json.dumps(newsjson))

newsWithoutImages.close()
newsWithImages.close()