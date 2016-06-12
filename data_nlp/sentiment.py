import json
import requests as r
from collections import defaultdict

locations = ['mountainview', 'newyork', 'paris', 'sanfransisco']
# locations = ['sanfransisco' ]
dic = {}

for location in locations:
	with open(location + '_from_tag.json') as file:
		travel = json.load(file)

	aggregate = 0.0
	count = 0

	for  post in travel["posts"]:
		try:
			tp = post['text'].encode('utf-8').strip().replace('#', '').replace('@', '')
		except Exception, e:
			pass
		if 'travel' in tp:
			count += 1
			try:
				sentiment_value = json.loads(r.get('https://api.havenondemand.com/1/api/sync/analyzesentiment/v1?text=' + tp + '&language=eng&apikey=962adb77-7af2-482f-b75c-b62f5fd008c3').text)
				aggregate += sentiment_value['aggregate']['score']
			except Exception as e:
				print "\n*** " + str(e) + " ***\n"
				print tp
		# print  sentiment_value

	aggregate = aggregate / count

	dic[location] = aggregate
	print dic[location]
total = sum([dic[i] for i in dic])

perc = {}

for i in dic:
	perc[i] = dic[i]*100/total

result = [perc, dic]
print result
with open('result.txt', 'w') as file:
	file.write(json.dumps(result))
