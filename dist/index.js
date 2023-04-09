"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHook = exports.Attachment = exports.Embded = exports.DiscordEmbedComponentType = exports.DiscordEmbedType = void 0;
const axios_1 = require("axios");
const fs_1 = require("fs");
const FormData = require("form-data");
exports.DiscordEmbedType = {
    rich: "rich",
    image: "image",
    video: "video",
    gifv: "gifv",
    article: "article",
    link: "link",
};
exports.DiscordEmbedComponentType = {
    Action_Row: 1,
    Button: 2,
    Select_Menu: 3,
};
class Embded {
    constructor(opts) {
        var _a, _b, _c, _d, _e, _f;
        this.type = (_a = opts.type) !== null && _a !== void 0 ? _a : exports.DiscordEmbedType.rich;
        this.timestamp = (_b = opts.timestamp) !== null && _b !== void 0 ? _b : new Date();
        this.fields = (_c = opts.fields) !== null && _c !== void 0 ? _c : [];
        this.color = (_d = opts.color) !== null && _d !== void 0 ? _d : Math.floor(Math.random() * 10000000);
        this.provider = (_e = opts.provider) !== null && _e !== void 0 ? _e : { name: "Gatlab™" };
        this.footer = (_f = opts.footer) !== null && _f !== void 0 ? _f : {
            text: 'Gatlab™',
            icon_url: 'https://avatars.githubusercontent.com/u/112801555?s=200&v=4',
            proxy_icon_url: 'https://avatars.githubusercontent.com/u/112801555?s=200&v=4'
        };
        Object.assign(this, opts);
    }
}
exports.Embded = Embded;
class Attachment {
    constructor(input, opt) {
        this.input = typeof input == "string" ? (0, fs_1.createReadStream)(input) : input;
        this.options = opt;
    }
}
exports.Attachment = Attachment;
const delay = (ms) => new Promise(function (resolve) {
    setTimeout(resolve, ms);
});
class WebHook {
    constructor(webhook_url) {
        this.url = webhook_url;
    }
    sendMessage(msg, max_retry = 50) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const configs = { validateStatus: () => true };
                let payload = msg;
                if (msg.files) {
                    const form = new FormData();
                    let i = 0;
                    for (const f of msg.files) {
                        form.append(`file${i}`, f.input, f.options);
                        i++;
                    }
                    delete msg.files;
                    configs.headers = form.getHeaders();
                    form.append('payload_json', JSON.stringify(msg));
                    payload = form;
                }
                let try_again = true;
                let counter = 0;
                let out = new Error('Webhook Unable send');
                while (try_again && counter <= max_retry) {
                    const e = yield axios_1.default.post(this.url, payload, configs);
                    if (e.status === 429) {
                        const waitUntil = e.data.retry_after;
                        yield delay(waitUntil);
                        counter++;
                    }
                    else {
                        try_again = false;
                        out = [200, 204].includes(e.status) ? e.data : new Error(`Error sending webhook: ${e.status} status code. Response: ${e.data}`);
                        break;
                    }
                }
                return Promise.resolve(out);
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
}
exports.WebHook = WebHook;
exports.default = WebHook;
