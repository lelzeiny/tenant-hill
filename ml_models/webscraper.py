from urllib.request import urlopen as uReq
import urllib.request
from bs4 import BeautifulSoup as soup

def getSoup(page_number):
    my_url = 'https://www.apartments.com/berkeley-ca/'+ str(page_number) +'/?bb=pv8psqpmzOii26_Z'

    PYTHONHTTPSVERIFY = 0

    req = urllib.request.Request(
        my_url,
        data=None,
        headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'
        }
    )

    uClient = uReq(req)
    page_html = uClient.read()
    uClient.close()

    # Parses html.
    return soup(page_html, 'html.parser')

filename = 'listings.csv'
f = open(filename, 'w')
headers = 'title,beds,address,street,zipcode,dog,cat,dishwasher,ac,laundry,parking,gym,price\n'
f.write(headers)

for i in range(29):
    page_soup = getSoup(i)
    # Gets each listing.
    containers = page_soup.findAll('li', {'class':'mortar-wrapper'})

    for container in containers:
        title = container.article.findAll('span', {'class': 'js-placardTitle title'})
        price = container.article.findAll('div', {'class':'price-range'})
        beds = container.article.findAll('div', {'class':'bed-range'})
        address = container.article.findAll('div', {'class': 'property-address js-url'})
        amenities = containers[0].article.findAll('div', {'class': 'property-amenities'})

        if len(title) and len(price) and len(beds) and len(address):
            title = title[0].text.replace(',', '|')
            price = price[0].text.replace(',', '').replace('$', '').replace('-', '')

            temp = ''
            index = 0

            while index < len(price) and price[index] != ' ':
                temp += price[index]
                index += 1
            price = temp

            beds = beds[0].text.replace(',', '')[0]

            if (beds < '0' or beds > '9'):
                beds = '1'

            address = address[0].text.replace(',', '|')

            street = ''
            index = 0

            while index < len(address) and address[index] != '|':
                street += address[index]
                index += 1

            if len(amenities):
                amenities = amenities[0].text
            else:
                amenities = 'None'

            zipcode = address[-5:]

            dog = 'Dog Friendly' in amenities
            cat = 'Cat Friendly' in amenities
            dishwasher = 'Dishwasher' in amenities
            ac = 'Air Conditioning' in amenities
            laundry = 'Washer/Dryer - In Unit' in amenities
            parking = 'Parking' in amenities
            gym = 'Fitness Center' in amenities

            dog = str(dog)
            cat = str(cat)
            dishwasher = str(dishwasher)
            ac = str(ac)
            laundry = str(laundry)
            parking = str(parking)
            gym = str(gym)

            if (price[0] >= '0' and price[0] <= '9'):
                f.write(title + ',' + beds + ',' + address + ',' + street + ',' + zipcode + ',' + dog + ',' + cat + ',' + dishwasher + ',' + ac + ',' + laundry + ',' + parking + ',' + gym + ',' + price +'\n')
                print(address)

f.close()
