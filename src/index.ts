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

interface IWarframeEventStatus {
  [key: string]: any;
}
interface IWarframeEvents {
  [event: string]: string;
}
type Language =
  | "en"
  | "es"
  | "fr"
  | "it"
  | "ko"
  | "pl"
  | "pt"
  | "ru"
  | "zh"
  | "uk";
interface IUserInput {
  eventType: string;
  language: Language;
}

event.addListener("start", async (warframeEvents, queryLanguages) => {
  const input = await getUserInput(warframeEvents, queryLanguages);
  const evalInput = await evaluateUserInput(input);
  console.log(evalInput);
});
event.emit("start", warframeEvents, queryLanguages);

async function getUserInput(
  wfEvents: Array<IWarframeEvents>,
  languages: Array<Language>
): Promise<IUserInput> {
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
  ])) as IUserInput;

  return {
    eventType: getEventInput.eventType,
    language: getEventInput.language,
  };
}

async function evaluateUserInput({
  eventType,
  language,
}: IUserInput): Promise<IUserInput> {
  const [chosenEvent] = warframeEvents.filter((event: IWarframeEvents) => {
    const eventName = Object.keys(event)[0];
    return eventType === eventName.toString() && event;
  });
  return {
    eventType: chosenEvent[eventType],
    language,
  };
}

async function fetchEventData(
  api: string,
  { eventType, language }: IUserInput
): Promise<IWarframeEventStatus | null> {
  try {
    const getData = await fetch(`${api}${eventType}?language=${language}`);
    const parseToJson = await getData.json();
    console.log(parseToJson);
    return parseToJson as IWarframeEventStatus;
  } catch (err) {
    console.log(err);
    return null;
  }
}
