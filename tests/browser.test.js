//Här importeras beroenden för att kunna köra Selenium-tester
const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

/*
Den första raden berättar var HTML-dokumentet som vi vill testa
ligger. Det går naturligtvis bra att testa även HTML-sidor på
en webbserver, men här har vi valt att bara testa index.html
från den här uppgiften.

Timeouten används för att Selenium inte ska ligga och vänta
på tester som inte går igenom i all evighet.
Den tredje raden skapar bara en variabel för den driver
som används för att köra anropen till webbläsaren.
*/
const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

/*
Funktionerna beforeAll och afterAll körs innan och efter alla
testfall. Det går bra att lägga dessa inne i en testsvit
(dvs describe). Dessa körs då innan och efter testfallen i
den aktuella testsviten.
*/

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

/*
Testfallet måste köras asynkront, eftersom vi gör ett externt
anrop till webbläsaren. Därför är själva testmetoden markerad
med async och anropet för att hitta elementet föregås av en await.
Vi hittar elementet genom att använda metoden findElement(string)
på driver-objektet.

Det du ser inne i anropet är Seleniums statiska By-metoder.
Du kan välja ut element på en webbsida på samma sätt som med
jQuery eller CSS.

Slutligen använder vi vanliga assertions från Jest för att
verifiera att testet gick igenom.
*/

test('The stack should be empty in the beginning', async () => {
	let stack = await driver.findElement(By.id('top_of_stack')).getText();
	expect(stack).toEqual("n/a");
});

//Rättat fel i testkoden
test('Popping from an empty stack', async () => {
    //Pop-operationen körs efter klick på pop-knappen
    let popButton = await driver.findElement(By.id('pop'));
    await popButton.click();

    let alert = await driver.switchTo().alert();

    //Hämta texten i alert
    let alertText = await alert.getText();

    //Låt alert försvinna
    await alert.accept();

    //Kontrollera så att texten i alert är detsamma som texten
    //vid körning av pop på en tom stack
    expect(alertText).toEqual("Tog bort undefined");
});

describe('Clicking "Pusha till stacken"', () => {
	it('should open a prompt box', async () => {
		let push = await driver.findElement(By.id('push'));
		await push.click();
		let alert = await driver.switchTo().alert();
		await alert.sendKeys("Bananer");
		await alert.accept();
	});
});

