#! /usr/bin/env node
import EventEmitter from "events";
import fetch from "node-fetch";
interface IWarframeEventStatus {
  [key: string]: any;
}
interface IUserInput {
  missionType: string;
  languageType: string;
}

const event = new EventEmitter();
const warframeAPI = `https://api.warframestat.us/pc/`; //path parameters+language
console.log("Init wf cli");

async function getUserInput(): Promise<IUserInput> {
  return { missionType: "this is a string", languageType: "en" };
}

async function fetchEventData(
  api: string,
  { missionType, languageType }: IUserInput
): Promise<IWarframeEventStatus | null> {
  try {
    const getData = await fetch(
      `${api}${missionType}?language=${languageType}`
    );
    const parseToJson = await getData.json();
    console.log(parseToJson);
    return parseToJson as IWarframeEventStatus;
  } catch (err) {
    console.log(err);
    return null;
  }
}

const data = await fetchEventData(warframeAPI, {
  missionType: "sortie",
  languageType: "en",
});
console.log(data);
