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
    .option('-i --interval <interval>', 'Web Browser Access Interval (ms)', parseInt, '100')
    .parse(process.argv);

if(program.args.length < 1){
    console.log("invaild Paramaters <url>");
    process.exit(1);
}
class ChromyBenchClass {
    constructor(program) {
        this.urlArgs = program.args;
        this.count = program.count ? program.count : 1;
        this.noCache = program.noCache ? true : false;
        this.noCookie = program.noCookie ? true : false;
        this.userAgent = program.userAgent ? program.userAgent : 'pc';
        this.visible = program.visible ? true : false;
        this.setCookie = program.setCookie ? JSON.parse(program.setCookie) : null;
        this.interval = program.interval ? program.interval : 100;
        this.chromy = new Chromy({
            visible: this.visible
        });
    }
    async sleep(msec) {
        return new Promise((resolve) => {
            return setTimeout(resolve, msec);
        });
    }
    getTimeNow() {
        return new Date().getTime();
    }
    async run() {
        try {
            let firstLoad = true;
            if (this.userAgent === "mobile") {
                await this.chromy.emulate('iPhone6');
            }
            if (this.setCookie) {
                await this.chromy.setCookie(setCookie);
            }
            await this.chromy.start();
            await this.sleep(1000);
            while (this.count > 0) {
                let start_ms = this.getTimeNow();
                await this.chromy.goto(this.urlArgs[0], {
                    waitLoadEvent: false
                });
                await this.chromy.waitLoadEvent();
                if (firstLoad) {
                    console.log("FirstLoad:" + (this.getTimeNow() - start_ms) + "ms");
                    firstLoad = false;
                } else {
                    console.log("Load:" + (this.getTimeNow() - start_ms) + "ms");
                }
                this.count--;
                if (this.noCache) {
                    await this.chromy.clearBrowserCache();
                }
                if (this.noCookie) {
                    await this.chromy.clearAllCookies();
                    if (this.setCookie) {
                        await this.chromy.setCookie(setCookie);
                    }
                }
                await this.sleep(this.interval);
            }
            await this.chromy.close();
        } catch (e) {
            console.error(e);
        }
    }
}

const cbc = new ChromyBenchClass(program);
cbc.run();