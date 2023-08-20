#! /usr/bin/env node
import EventEmitter from "events";
import fetch from "node-fetch";
import Enquirer from "enquirer";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const warframeEvents = require("./app-queries/events.json");
const queryLanguages = require("./app-queries/languages.json");
const event = new EventEmitter();
const warframeAPI = `https://api.warframestat.us/pc/`; //path parameters+language
event.addListener("start", getUserInput);
event.emit("start", warframeEvents, queryLanguages);
async function getUserInput(wfEvents, languages) {
    console.log("Init wf cli");
    const getEventInput = (await Enquirer.prompt([
        {
            type: "select",
            name: "eventType",
            message: "Pick an event",
            choices: wfEvents.map((item) => {
                const keys = Object.keys(item);
                return keys[0];
            }),
        },
        {
            type: "select",
            name: "language",
            message: "Pick a language",
            choices: languages,
        },
    ]));
    console.log({
        eventType: getEventInput.eventType,
        language: getEventInput.language,
    });
    return {
        eventType: getEventInput.eventType,
        language: getEventInput.language,
    };
}
async function evaluateUserInput(input) { }
async function fetchEventData(api, { eventType, language }) {
    try {
        const getData = await fetch(`${api}${eventType}?language=${language}`);
        const parseToJson = await getData.json();
        console.log(parseToJson);
        return parseToJson;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}
