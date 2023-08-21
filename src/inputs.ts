import { IUserInput, Language, IWarframeEvents } from "./types.js";
import Enquirer from "enquirer";

export async function getUserInput(
  wfEvents: Array<IWarframeEvents>,
  languages: Array<Language>
): Promise<IUserInput> {
  const input = (await Enquirer.prompt([
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

  function returnChosenEvent(
    { eventType, language }: IUserInput,
    warframeEvents: Array<IWarframeEvents>
  ): IUserInput {
    const [chosenEvent] = warframeEvents.filter((event: IWarframeEvents) => {
      const eventName = Object.keys(event)[0];
      return eventType === eventName.toString() && event;
    });
    return {
      eventType: chosenEvent[eventType],
      language,
    };
  }

  return returnChosenEvent(input, wfEvents);
}
