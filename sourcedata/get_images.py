import requests

def getImage(url)
	query = {
	  "url": url,
	  "key": ":1c3ec45554be406cb650192b00e322dd"
	}

	r = requests.get('https://api.embedly.com/1/oembed', params=query)

	print "got image"
	return r.json()['thumbnail_url']

newsWithoutImages = open("news.json", 'r')
newsWithImages = open("news.json", 'r')

json = json.load(newsWithoutImages.read())

for item in json:
	print item

newsWithoutImages.close()
newsWithImages.close()