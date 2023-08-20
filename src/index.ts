#! /usr/bin/env node
import EventEmitter from "events";
import fetch from "node-fetch";
import Enquirer from "enquirer";
// import { createRequire } from "module";

// const require = createRequire(import.meta.url);
// const warframeEvents = require("./app-queries/events.json");
// const languages = require("./app-queries/languages.json")
const event = new EventEmitter();
const warframeAPI = `https://api.warframestat.us/pc/`; //path parameters+language
interface IWarframeEventStatus {
  [key: string]: any;
}
interface IUserInput {
  eventType: string;
  languageType: string;
}

console.log("Init wf cli");

async function getUserInput(): Promise<IUserInput> {
  const getInputs = await Enquirer.prompt({
    type: "select",
    name: "eventType",
    message: "Pick an event",
    choices: ["ge", "lo", "fa"],
  });
  console.log(getInputs);
  return { eventType: "this is a string", languageType: "en" };
}

getUserInput();

async function fetchEventData(
  api: string,
  { eventType, languageType }: IUserInput
): Promise<IWarframeEventStatus | null> {
  try {
    const getData = await fetch(`${api}${eventType}?language=${languageType}`);
    const parseToJson = await getData.json();
    console.log(parseToJson);
    return parseToJson as IWarframeEventStatus;
  } catch (err) {
    console.log(err);
    return null;
  }
}
