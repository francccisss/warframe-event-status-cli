import fetch from "node-fetch";
import { IWarframeEventStatus, IUserInput } from "./types.js";
import { createSpinner } from "nanospinner";
async function fetchEventData(
  api: string,
  { eventType, language }: IUserInput
): Promise<IWarframeEventStatus | null> {
  const spinner = createSpinner("Fetching current event status...").start();
  try {
    const getData = await fetch(`${api}${eventType}?language=${language}`);
    const parseToJson = await getData.json();
    spinner.success({ text: "Current status", mark: "✔" });
    console.log(parseToJson);
    return parseToJson as IWarframeEventStatus;
  } catch (err) {
    console.log(err);
    spinner.success({
      text: "Sorry, but we are not able to get the current status of the chosen event",
      mark: "☠",
    });
    return null;
  }
}

export default fetchEventData;
