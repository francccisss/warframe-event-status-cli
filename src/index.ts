#! /usr/bin/env node
import EventEmitter from "events";
import fetch from "node-fetch";
import Enquirer from "enquirer";
import { createRequire } from "module";
import { SrvRecord } from "dns";
import { get } from "http";

const require = createRequire(import.meta.url);
const warframeEvents = require("./app-queries/events.json");
const languages = require("./app-queries/languages.json");
const event = new EventEmitter();
const warframeAPI = `https://api.warframestat.us/pc/`; //path parameters+language
interface IWarframeEventStatus {
  [key: string]: any;
}

interface IWarframeEvents {
  [event: string]: string;
  // "cetus (eidolon-hunts)": string;
  // archon: string;
  // sortie: string;
  // "cambion-drift": string;
  // nightwave: string;
  // "Void trader": string;
  // "Vault trader": string;
  // "Orb valis": string;
  // Fissures: string;
}
interface IUserInput {
  eventType: string;
  languageType: string;
}

event.addListener("start", getUserInput);
event.emit("start", warframeEvents);

async function getUserInput(
  wfEvents: Array<{ [event: string]: string }>
): Promise<IUserInput> {
  console.log("Init wf cli");
  const getEventInput = (await Enquirer.prompt({
    type: "select",
    name: "eventType",
    message: "Pick an event",
    choices: wfEvents.map((item) => {
      const keys = Object.keys(item);
      return keys[0];
    }),
  })) as IUserInput;

  console.log({ e: getEventInput.eventType });
  return {
    eventType: getEventInput.eventType,
    languageType: getEventInput.languageType,
  };
}

async function evaluateUserInput(input: IUserInput) {}

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
