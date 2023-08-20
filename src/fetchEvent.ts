import fetch from "node-fetch";
import { IWarframeEventStatus, IUserInput } from "./types.js";
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

export default fetchEventData;
