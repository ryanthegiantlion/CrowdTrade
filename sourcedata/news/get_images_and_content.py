import requests, json

def getImage(url):
	query = {
	  "url": url,
	  "key": ":1c3ec45554be406cb650192b00e322dd"
	}

	r = requests.get('https://api.embedly.com/1/oembed', params=query)

	print "url: ", url
	print "got image"
	lajson = r.json()
	if 'thumbnail_url' in lajson:
		return r.json()['thumbnail_url']
	else:
		print "f, f, f, faaa, faaaail !!!!!!!!"
		return None

def getContent(url):
	query = {
	  "url": url,
	  "key": ":1c3ec45554be406cb650192b00e322dd"
	}

	r = requests.get('https://api.embedly.com/1/extract', params=query)

	print "got content"
	lajson = r.json()
	if 'content' in lajson:
		return r.json()['content']
	else:
		print "f, f, f, faaa, faaaail !!!!!!!!"
		return None

newsWithoutImages = open("news_selected.json", 'r')
newsWithImages = open("newswithimages_selected.json", 'w')

news = newsWithoutImages.read()
# print news

newsjson = json.loads(news)

for item in newsjson:
	item['image'] = getImage(item['url'])
	item['content'] = getContent(item['url'])

newsWithImages.write(json.dumps(newsjson))

newsWithoutImages.close()
newsWithImages.close()