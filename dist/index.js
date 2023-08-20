#! /usr/bin/env node
import EventEmitter from "events";
import fetch from "node-fetch";
const event = new EventEmitter();
const warframeAPI = `https://api.warframestat.us/pc/`; //path parameters+language
console.log("Init wf cli");
async function getUserInput() {
    return { missionType: "this is a string", languageType: "en" };
}
async function fetchEventData(api, { missionType, languageType }) {
    try {
        const getData = await fetch(`${api}${missionType}?language=${languageType}`);
        const parseToJson = await getData.json();
        console.log(parseToJson);
        return parseToJson;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}
const data = await fetchEventData(warframeAPI, {
    missionType: "sortie",
    languageType: "en",
});
console.log(data);
