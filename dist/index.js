#! /usr/bin/env node
import EventEmitter from "events";
import { createRequire } from "module";
import { getUserInput, evaluateUserInput } from "./inputs.js";
const require = createRequire(import.meta.url);
const warframeEvents = require("./app-queries/events.json");
const queryLanguages = require("./app-queries/languages.json");
const event = new EventEmitter();
const warframeAPI = `https://api.warframestat.us/pc/`; //path parameters+language
event.addListener("start", async (warframeEvents, queryLanguages) => {
    const input = await getUserInput(warframeEvents, queryLanguages);
    const evalInput = await evaluateUserInput(input, warframeEvents);
    console.log(evalInput);
});
event.emit("start", warframeEvents, queryLanguages);
