import Enquirer from "enquirer";
export async function getUserInput(wfEvents, languages) {
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
    ]));
    function returnChosenEvent({ eventType, language }, warframeEvents) {
        const [chosenEvent] = warframeEvents.filter((event) => {
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
