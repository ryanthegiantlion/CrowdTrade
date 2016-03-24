import xmltodict, json, sys

for line in sys.stdin:
	line = line.rstrip()
	xmlFile = open(line, 'r')
	o = xmltodict.parse(xmlFile.read())
	xmlFile.close()
	jsonStr = json.dumps(o) 
	jsonFile = open(line + '.json', 'w')
	jsonFile.write(jsonStr)
	jsonFile.close()

