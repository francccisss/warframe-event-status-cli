#! /usr/bin/env node
import EventEmitter from "events";
import { createRequire } from "module";
import fetchEventData from "./fetchEvent.js";
import { getUserInput } from "./inputs.js";

const require = createRequire(import.meta.url);
const warframeEvents = require("./app-queries/events.json");
const queryLanguages = require("./app-queries/languages.json");
const event = new EventEmitter();
const warframeAPI = `https://api.warframestat.us/pc/`; //path parameters+language

event.on("start", async (warframeEvents, queryLanguages) => {
  const input = await getUserInput(warframeEvents, queryLanguages);
  console.log(input);
  event.emit("fetch", input);
});
event.emit("start", warframeEvents, queryLanguages);
