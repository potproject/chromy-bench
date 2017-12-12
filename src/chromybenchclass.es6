import Chromy from 'chromy';
import program from 'commander';
import statistical from './statistical.es6';

export default class ChromyBenchClass {
    constructor() {
        //Commander
        program
        .version('0.0.1')
        .usage('chromy-bench [options] <url>')
        .option('-c, --count <n>', 'URL Access Count', parseInt)
        .option('--nocache', 'Not Using Browser Cache')
        .option('--nocookie', 'Not Using Browser Cookies')
        .option('-v, --visible', 'Visible Chrome Browser')
        .option('-ua, --useragent <ua>', 'Setting User Agent (pc/mobile)', /^(pc|mobile)$/i, 'pc')
        .option('--setcookie <setcookie>', 'Set Cookie Params (JSONText)')
        .option('-i --interval <interval>', 'Web Browser Access Interval (ms)', parseInt, 100)
        .parse(process.argv);

        if (program.args.length < 1) {
            console.log("invaild Paramaters <url>");
            process.exit(1);
            return;
        }

        this.urlArgs = program.args;
        this.count = program.count ? program.count : 1;
        this.noCache = program.nocache ? true : false;
        this.noCookie = program.nocookie ? true : false;
        this.userAgent = program.useragent ? program.userAgent : 'pc';
        this.visible = program.visible ? true : false;
        /**
         * SetCookie Example
         * chromy-bench http://localhost/ -v --setcookie '{"url": "http://localhost/", "name": "name1", "value": "val1"}'
         */
        this.setCookie = program.setcookie ? JSON.parse(program.setcookie) : null;
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
            if (this.setCookie !== null) {
                await this.chromy.setCookie(this.setCookie);
            }

            let timerResultDOMContentLoaded = [];
            let timerResultLoad = [];
            await this.chromy.start();
            await this.sleep(1000);
            while (this.count > 0) {
                let start_ms = this.getTimeNow();
                this.chromy.goto(this.urlArgs[0], {
                    waitLoadEvent: false
                });
                await this.chromy.client.Page.domContentEventFired();
                let DOMContentLoaded = this.getTimeNow() - start_ms;
                await this.chromy.client.Page.loadEventFired();
                let Load = this.getTimeNow() - start_ms;
                timerResultDOMContentLoaded.push(DOMContentLoaded);
                timerResultLoad.push(Load);
                if (firstLoad) {
                    console.log("DOMContentLoaded " + DOMContentLoaded + "ms Load " + Load + "ms");
                    firstLoad = false;
                } else {
                    console.log("DOMContentLoaded " + DOMContentLoaded + "ms Load " + Load + "ms");
                }
                this.count--;
                if (this.noCache) {
                    await this.chromy.clearBrowserCache();
                }
                if (this.noCookie) {
                    await this.chromy.clearAllCookies();
                    if (this.setcookie) {
                        await this.chromy.setCookie(this.setCookie);
                    }
                }
                await this.sleep(this.interval);
            }
            await this.chromy.close();

            //result
            console.log("--- " + this.urlArgs[0] + " statistics ---");
            console.log("DOMContentLoaded:");
            console.log("round-trip min/avg/max/stddev = " +
                statistical.min(timerResultDOMContentLoaded) + "/" +
                statistical.avg(timerResultDOMContentLoaded) + "/" +
                statistical.max(timerResultDOMContentLoaded) + "/" +
                statistical.stddev(timerResultDOMContentLoaded) + " ms");
            console.log("Load:");
            console.log("round-trip min/avg/max/stddev = " +
            statistical.min(timerResultLoad) + "/" +
            statistical.avg(timerResultLoad) + "/" +
            statistical.max(timerResultLoad) + "/" +
            statistical.stddev(timerResultLoad) + " ms");
        } catch (e) {
            console.error(e);
        }
    }
}