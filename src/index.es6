import Chromy from 'chromy';
import program from 'commander';

//Commander
program
    .version('0.0.1')
    .usage('chromy-bench [options] <url>')
    .option('-c, --count <n>', 'URL Access Count', parseInt)
    .option('-nocache, --no-cache', 'Not Using Browser Cache')
    .option('-nocookie, --no-cookie', 'Not Using Browser Cookies')
    .option('-v, --visible', 'Visible Chrome Browser')
    .option('-ua, --user-agent <ua>', 'Setting User Agent (pc/mobile)', /^(pc|mobile)$/i, 'pc')
    .option('-setcookie, --set-cookie <cookie>', 'Set Cookie Params (JSONText)')
    .parse(process.argv);

let url = program.args;
let count = program.count ? program.count : 1;
let noCache = program.noCache ? true : false;
let noCookie = program.noCookie ? true : false;
let userAgent = program.userAgent ? program.userAgent : 'pc';
let visible = program.visible ? true : false;
let setCookie = program.setCookie ? JSON.parse(program.setCookie) : null;
if (url.length < 1) {
    console.log("invaild Paramaters <url>");
    process.exit(1);
}
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

let chromy = new Chromy({
    visible: visible
});
main(chromy, url[0], count, userAgent, noCache, noCookie, setCookie);

async function main(chromy, url, count = 1, userAgent, noCache, noCookie, setCookie) {
    try {
        let firstLoad = true;
        if (userAgent === "mobile") {
            await chromy.emulate('iPhone6');
        }
        if (setCookie) {
            await chromy.setCookie(setCookie);
        }
        await chromy.start();
        await sleep(1000);
        while (count > 0) {
            let start_ms = getTime();
            await chromy.goto(url, {
                waitLoadEvent: false
            });
            await chromy.waitLoadEvent();
            if (firstLoad) {
                console.log("FirstLoad:" + (getTime() - start_ms) + "ms");
                firstLoad = false;
            } else {
                console.log("Load:" + (getTime() - start_ms) + "ms");
            }
            count--;
            if (noCache) {
                await chromy.clearBrowserCache();
            }
            if (noCookie) {
                await chromy.clearAllCookies();
                if (setCookie) {
                    await chromy.setCookie(setCookie);
                }
            }
            await sleep(100);
        }
        await chromy.close();
    } catch (e) {
        console.error(e);
    }
}

function getTime() {
    return new Date().getTime();
}