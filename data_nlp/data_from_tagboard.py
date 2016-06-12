
import requests
import json


locations = ['torronto', 'mountainview', 'newyork', 'paris', 'sanfransisco']

for location in locations:
	filename = location + "_from_tag"

	hashtag = location
	with open(filename+'.json', 'w') as file:

		r = requests.get("https://post-cache.tagboard.com/search/"+hashtag+"?excluded_networks=instagram&count=100")

		data = json.loads(r.text)

		file.write(json.dumps(data))
