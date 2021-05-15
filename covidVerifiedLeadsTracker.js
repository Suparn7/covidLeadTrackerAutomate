const p = require('puppeteer');
let email = "gamege8517@whipjoy.com";
let username = "suparn73488744";
let password = "123@@@456987";

let searchKeyword = "Delhi beds verified";
let Link = "https://twitter.com";



async function main() {
    let browser = await p.launch({
        headless: false,
        defaultViewport: false,
        args: ["--start-maximized"]
    })

    let pages = await browser.pages();
    tab = pages[0];

    await tab.goto("https://twitter.com/login");
    // await tab.waitForNavigation({ waitUntil: "networkidle2" });
    await tab.waitForSelector("input[type='text']", { visible: true });
    await tab.type("input[type='text']", username);
    await tab.waitForSelector("input[type='password']", { visible: true });
    await tab.type("input[type='password']", password);
    
    await tab.waitForSelector("div[data-testid='LoginForm_Login_Button']", { visible: true });
    await tab.click("div[data-testid='LoginForm_Login_Button']");

    await tab.waitForSelector("a[data-testid='AppTabBar_Explore_Link']", { visible: true });
    await tab.click("a[data-testid='AppTabBar_Explore_Link']");

    await tab.waitForSelector("input[data-testid='SearchBox_Search_Input']", { visible: true });
    await tab.type("input[data-testid='SearchBox_Search_Input']", searchKeyword);

    await tab.keyboard.press("Enter");
    
    await new Promise(function(resolve, reject){
        setTimeout(function() {
            resolve();
        }, 3000);
    })
    // await tab.click(".css-1dbjc4n.r-ymttw5.r-1yzf0co");
    await tab.waitForSelector(".css-1dbjc4n.r-ymttw5.r-1yzf0co", { visible: true });
    let covidverified = await tab.$$(".css-1dbjc4n.r-ymttw5.r-1yzf0co");
    covidverified[0].click();
    
    await new Promise(function(resolve, reject){
        setTimeout(function() {
            resolve();
        }, 1000);
    })
    let aTags = await tab.$$("a");
    let links = [];
    for(let i of aTags){
        let urlFetchPromise = await tab.evaluate(function(ele){
            return ele.getAttribute('href');
        }, i)
        links.push(urlFetchPromise);
    }

    let latest = links[11];
    //console.log(latest)
    await retweetPosts(latest);
    
    //await browser.close();
}





async function retweetPosts(url) {
    await tab.goto(Link + url);

    await new Promise(function(resolve, reject){
        setTimeout(function() {
            resolve();
        }, 2000);
    })
    await tab.waitForSelector(".css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-kzbkwu", { visible: true });
    let allPosts = await tab.$$(".css-1dbjc4n.r-1iusvr4.r-16y2uox.r-1777fci.r-kzbkwu");
    let firstPost = allPosts[0];
    let retweetButton = await firstPost.$$(".r-4qtqp9.r-yyyyoo.r-1xvli5t.r-dnmrzs.r-bnwqim.r-1plcrui.r-lrvibr.r-1hdv0qi");
    await retweetButton[2].click();

    await new Promise(function(resolve, reject){
        setTimeout(function() {
            resolve();
        }, 2000);
    })
    
    // await tab.waitForSelector(".css-1dbjc4n.r-1loqt21.r-18u37iz.r-1ny4l3l.r-ymttw5.r-1yzf0co.r-o7ynqc.r-6416eg.r-13qz1uu");
    let alloption = await tab.$$(".css-1dbjc4n.r-1loqt21.r-18u37iz.r-1ny4l3l.r-ymttw5.r-1yzf0co.r-o7ynqc.r-6416eg.r-13qz1uu");
    await alloption[0].click();


    // await tab.waitForSelector(".css-1dbjc4n.r-14lw9ot.r-16y2uox.r-1dqxon3.r-16wqof", { visible: true });
    // // await tab.click("a[herf='/login']");
    // await tab.goto(baseLink + url);

    await new Promise(function(resolve, reject){
        setTimeout(function() {
            resolve();
        }, 2000);
    })
    await tab.waitForSelector("div[data-testid='tweet']", { visible: true });

    let counter = 0;
    while(counter < 50) {
        let allPosts2 = await tab.$$("div[data-testid='tweet']");
        
        for(let i in allPosts2) {      
            let firstPost2 = allPosts2[i];
            let retweetButton2 = await firstPost2.$$(".r-4qtqp9.r-yyyyoo.r-1xvli5t.r-dnmrzs.r-bnwqim.r-1plcrui.r-lrvibr.r-1hdv0qi");
            await retweetButton2[2].click();
            counter++;
            await new Promise(function(resolve, reject){
                setTimeout(function() {
                    resolve();
                }, 2000);
            })
            

            await new Promise(function(resolve, reject){
                setTimeout(function() {
                    resolve();
                }, 100);
            })
        }
        
        if(counter >= 50)
            break;

        //window.scrollBy(0, 100);
    }
}



main();
