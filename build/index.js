"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coinspot_api_1 = require("@samuraitruong/coinspot-api");
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const secret = "03UFUGEM4NHJTQ3WE5DNW8FHW5UHT6NEN9FX5UBDK7JHK9DHND5D63Z69VHLL54LVGA34PRDAEDQC54E";
const key = "678949af243da56f8a4cdee7ea87b71a";
const client = new coinspot_api_1.CoinSpotClient(key, secret);
async function getBalance() {
    const balance = await client.myBalance();
    console.log(balance);
}
const coinArray = [];
async function cryptopriceScraper() {
    const url = "https://coinmarketcap.com/";
    await (0, axios_1.default)(url).then((response) => {
        const html_data = response.data;
        const $ = cheerio_1.default.load(html_data);
        const selectedElem = "#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr";
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
            if (parentIndex) {
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
        const prices = element['Coin'];
        console.log(element['No.'] + ' ' + prices);
    });
    return coinArray;
}
// async function buyStonk(coin: string, amount: number, rate: number) {
//     const buyMegaStonk = await client.myBuy(coin, amount, rate)
//     console.log(buyMegaStonk)
// }
cryptopriceScraper();
getBalance();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBMkQ7QUFDM0Qsa0RBQTBCO0FBQzFCLHNEQUE4QjtBQUU5QixNQUFNLE1BQU0sR0FBRyxrRkFBa0YsQ0FBQTtBQUNqRyxNQUFNLEdBQUcsR0FBRyxrQ0FBa0MsQ0FBQTtBQUU5QyxNQUFNLE1BQU0sR0FBRyxJQUFJLDZCQUFjLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBRTlDLEtBQUssVUFBVSxVQUFVO0lBRXJCLE1BQU0sT0FBTyxHQUFHLE1BQU0sTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDeEIsQ0FBQztBQUNELE1BQU0sU0FBUyxHQUFTLEVBQUUsQ0FBQztBQUMzQixLQUFLLFVBQVUsa0JBQWtCO0lBQzdCLE1BQU0sR0FBRyxHQUFHLDRCQUE0QixDQUFDO0lBRXpDLE1BQU0sSUFBQSxlQUFLLEVBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDakMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNoQyxNQUFNLENBQUMsR0FBRyxpQkFBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVsQyxNQUFNLFlBQVksR0FDaEIsZ0pBQWdKLENBQUM7UUFDbkosTUFBTSxJQUFJLEdBQUc7WUFDWCxLQUFLO1lBQ0wsTUFBTTtZQUNOLE9BQU87WUFDUCxLQUFLO1lBQ0wsSUFBSTtZQUNKLFdBQVc7WUFDWCxRQUFRO1lBQ1IsbUJBQW1CO1NBQ3BCLENBQUM7UUFFRixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxFQUFFO1lBQy9DLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztZQUNqQixNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDdkIsSUFBRyxXQUFXLEVBQUM7Z0JBQ2IsQ0FBQyxDQUFDLFVBQVUsQ0FBQztxQkFDVixRQUFRLEVBQUU7cUJBQ1YsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxFQUFFO29CQUM1QixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2xDLElBQUksS0FBSyxFQUFFO3dCQUNULFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7d0JBQ3BDLFFBQVEsRUFBRSxDQUFDO3FCQUNaO2dCQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNMLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDN0I7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN4QixNQUFNLE1BQU0sR0FBVyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQUlILHdFQUF3RTtBQUN4RSxrRUFBa0U7QUFDbEUsZ0NBQWdDO0FBQ2hDLElBQUk7QUFFSixrQkFBa0IsRUFBRSxDQUFBO0FBQ3BCLFVBQVUsRUFBRSxDQUFBIn0=