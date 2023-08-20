#! /usr/bin/env node
import EventEmitter from "events";

interface IWarframeEventStatus {
  [key: string]: any;
}
const event = new EventEmitter();
const warframeAPI = `https://api.warframestat.us/pc/`; //path parameters+language
console.log("Init wf cli");

async function fetchEventData(api: string): Promise<IWarframeEventStatus | {}> {
  return {};
}
