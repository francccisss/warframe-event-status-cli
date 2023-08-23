import { IWarframeEventStatus, IWarframeEvents } from "./types.js";
import { format, parseISO } from "date-fns";
import Table from "cli-table";
import chalk from "chalk";

async function logCurrentEventStatus(
  data: IWarframeEventStatus,
  wfEvents: IWarframeEvents
): Promise<void> {
  const { flatTable, nested } = createFlatTable(data, "vert");
  if (nested) {
    console.log(flatTable);
    console.log(nested);
    return;
  }
  console.log(flatTable);
}

function createFlatTable(
  data: IWarframeEventStatus,
  type: "vert" | "hor" = "vert"
): { flatTable: string; nested?: string } {
  const relevantData: Array<string> = [
    "state",
    "timeLeft",
    "location",
    "activation",
    "active",
    "expiry",
    "inventory",
    "missions",
    "type",
    "nightmare",
    "archwingRequired",
    "boss",
    "faction",
    "credits",
    "ducats",
    "eta",
    "missionType",
  ];
  const { reducedData, nestedData } = extractRelevantData(data, relevantData);
  const reducedDataKeys = Object.keys(reducedData).map((name) =>
    name.toUpperCase()
  );
  if (type === "hor") {
    const createColWidths = reducedDataKeys.map(() => {
      return 20;
    });
    var table = new Table({
      head: reducedDataKeys,
      colWidths: createColWidths,
    });
    const newTable = Object.values(reducedData as object);
    table.push(newTable);

    if (nestedData !== null) {
      const nested = createNestedTable(nestedData);
      return { flatTable: table.toString(), nested };
    }
    return { flatTable: table.toString() };
  } else if (type === "vert") {
    var table = new Table();
    for (const [key, value] of Object.entries(reducedData as object)) {
      const newTable = { [key]: value };
      table.push(newTable);
    }
    if (nestedData !== null) {
      const nested = createNestedTable(nestedData);
      return { flatTable: table.toString(), nested };
    }
    return { flatTable: table.toString() };
  } else {
    return { flatTable: "", nested: "" };
  }
}

function createNestedTable(
  nestedTableArray: Array<IWarframeEventStatus>
): string {
  const relevantData: Array<string> = [
    "modifierDescription",
    "modifier",
    "missionType",
    "state",
    "timeLeft",
    "location",
    "active",
    "inventory",
    "missions",
    "variants",
    "type",
    "nightmare",
    "archwingRequired",
    "boss",
    "faction",
    "credits",
    "ducats",
    "eta",
    "missionType",
    "item",
  ];
  const nestedTitle = Object.keys(nestedTableArray)[0];
  const nestedArray = nestedTableArray[nestedTitle as any];
  // its maybe because its trying to extract an empty array
  // if the nested objects are of length 0
  // event if it is being checked above to not execute this function
  // it is still proceeding
  // extractRelevantData needs an array of objects and will throw an error if there
  // are no objects within the array
  const { reducedData } = extractRelevantData(nestedArray[0], relevantData);
  const table = new Table({
    head: [
      nestedTitle.toUpperCase(),
      ...(nestedArray.length !== 0
        ? Object.keys(reducedData).map((name) => name.toUpperCase())
        : []),
    ],
  });

  nestedArray.forEach((value: object, i: number) => {
    let tmpArr = [];
    const { reducedData } = extractRelevantData(value, relevantData);
    console.log(reducedData);
    for (let j = 0; j < Object.values(reducedData).length; j++) {
      Object.values(reducedData)[j] !== null
        ? tmpArr.push(
            Object.values(reducedData as IWarframeEventStatus)[j].toString()
          )
        : tmpArr.push("missing data");
    }
    table.push({ [i]: tmpArr });
  });
  return table.toString();
}

function extractRelevantData(
  data: IWarframeEventStatus,
  relevantData: Array<string>
): IWarframeEventStatus {
  let reducedData = {};
  let nestedData: IWarframeEventStatus | null = null;
  const getKeys = Object.keys(data);
  if (relevantData.length !== 0) {
    for (let i = 0; i < relevantData.length; i++) {
      if (relevantData[i] === "expiry" || relevantData[i] === "activation") {
        const formatTime = format(parseISO(data[relevantData[i]]), "PPpp");
        reducedData = { [relevantData[i]]: formatTime, ...reducedData };
      }
      if (Array.isArray(data[relevantData[i]])) {
        if (data[relevantData[i]].length !== 0)
          nestedData = { [relevantData[i]]: data[relevantData[i]] };
      }

      // iterate through the remaining properties that are needed
      for (let j = 0; j < getKeys.length; j++) {
        if (
          relevantData[i] === getKeys[j] &&
          !Array.isArray(data[relevantData[i]])
        ) {
          reducedData = {
            [relevantData[i]]: data[relevantData[i]],
            ...reducedData,
          };
        }
      }
    }
  }
  return { reducedData, nestedData };
}
export default logCurrentEventStatus;
