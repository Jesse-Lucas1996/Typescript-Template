import {CoinSpotClient} from '@samuraitruong/coinspot-api';
import axios from 'axios';
import cheerio from 'cheerio';

const secret = "03UFUGEM4NHJTQ3WE5DNW8FHW5UHT6NEN9FX5UBDK7JHK9DHND5D63Z69VHLL54LVGA34PRDAEDQC54E"
const key = "678949af243da56f8a4cdee7ea87b71a"

const client = new CoinSpotClient(key, secret)

async function getBalance()
{
    const balance = await client.myBalance()
    console.log(balance)
}
const coinArray: {}[] = [];
async function cryptopriceScraper() {
    const url = "https://coinmarketcap.com/";
  
    await axios(url).then((response) => {
      const html_data = response.data;
      const $ = cheerio.load(html_data);
  
      const selectedElem =
        "#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr";
      const keys = [
        "No.",
        "Coin",
        "Price",
        "24h",
        "7d",
        "Marketcap",
        "Volume",
        "CirculatingSupply",
      ];
  
      $(selectedElem).each((parentIndex, parentElem) => {
        let keyIndex = 0;
        const coinDetails = {};
        if(parentIndex){
          $(parentElem)
            .children()
            .each((_childId, childElem) => {
              const value = $(childElem).text();
              if (value) {
                coinDetails[keys[keyIndex]] = value;
                keyIndex++;
              }
            });
          coinArray.push(coinDetails);
        }
      });
    });
    coinArray.forEach(element => {
        const prices: string = element['Coin']
        console.log(element['No.'] + ' ' +prices)
    });
    return coinArray;
  }



// async function buyStonk(coin: string, amount: number, rate: number) {
//     const buyMegaStonk = await client.myBuy(coin, amount, rate)
//     console.log(buyMegaStonk)
// }

cryptopriceScraper()
getBalance()


