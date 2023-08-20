#! /usr/bin/env node
import EventEmitter from "events";
import fetch from "node-fetch";
import Enquirer from "enquirer";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const warframeEvents = require("./app-queries/events.json");
const languages = require("./app-queries/languages.json");
const event = new EventEmitter();
const warframeAPI = `https://api.warframestat.us/pc/`; //path parameters+language
event.addListener("start", getUserInput);
event.emit("start", warframeEvents);
async function getUserInput(wfEvents) {
    console.log("Init wf cli");
    const getInputs = (await Enquirer.prompt({
        type: "select",
        name: "eventType",
        message: "Pick an event",
        choices: wfEvents.map((item) => {
            const keys = Object.keys(item);
            return keys[0];
        }),
    }));
    console.log({ e: getInputs.eventType });
    return {
        eventType: getInputs.eventType,
        languageType: getInputs.languageType,
    };
}
async function fetchEventData(api, { eventType, languageType }) {
    try {
        const getData = await fetch(`${api}${eventType}?language=${languageType}`);
        const parseToJson = await getData.json();
        console.log(parseToJson);
        return parseToJson;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}
