import {
  IWarframeEventStatus,
  IUserInput,
  Language,
  IWarframeEvents,
} from "./types.js";
import Enquirer from "enquirer";

export async function getUserInput(
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

export async function evaluateUserInput(
  { eventType, language }: IUserInput,
  warframeEvents: IWarframeEventStatus
): Promise<IUserInput> {
  const [chosenEvent] = warframeEvents.filter((event: IWarframeEvents) => {
    const eventName = Object.keys(event)[0];
    return eventType === eventName.toString() && event;
  });
  return {
    eventType: chosenEvent[eventType],
    language,
  };
}
