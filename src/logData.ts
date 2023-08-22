import { traceDeprecation } from "process";
import { IWarframeEventStatus, IWarframeEvents } from "./types.js";
import { format, parseISO } from "date-fns";
import Table from "cli-table";
import { isTypedArray } from "util/types";

async function logCurrentEventStatus(
  data: IWarframeEventStatus,
  wfEvents: IWarframeEvents
): Promise<void> {
  const flatVertTable = createFlatTable(data, "hor");
  console.log(flatVertTable);
}

function createFlatTable(
  data: IWarframeEventStatus,
  type: "vert" | "hor" = "vert"
): string {
  const { reducedData, nestedData } = extractRelevantData(data);
  console.log(nestedData);
  const reducedDataKeys = Object.keys(reducedData);
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
    return table.toString();
  } else if (type === "vert") {
    var table = new Table();
    for (const [key, value] of Object.entries(reducedData as object)) {
      const newTable = { [key]: value };
      table.push(newTable);
    }
    return table.toString();
  } else {
    return "";
  }
}

function createNestedTable(nestedTableArray: IWarframeEventStatus): string {
  const nestedTable = new Table();

  return "";
}

function extractRelevantData(data: IWarframeEventStatus): IWarframeEventStatus {
  const relevantData: Array<string> = [
    "state",
    "timeLeft",
    "location",
    "activation",
    "active",
    "expiry",
    "inventory",
    "missions",
  ];
  let reducedData = {};
  let nestedData: IWarframeEventStatus | null = null;
  const getKeys = Object.keys(data as object);
  if (relevantData.length !== 0) {
    for (let i = 0; i < relevantData.length; i++) {
      if (relevantData[i] === "expiry" || relevantData[i] === "activation") {
        const formatTime = format(parseISO(data[relevantData[i]]), "PPpp");
        reducedData = { [relevantData[i]]: formatTime, ...reducedData };
      }
      if (Array.isArray(data[relevantData[i]])) {
        nestedData = { [relevantData[i]]: data[relevantData[i]] };
      }

      // iterates through the rest of the property that is needed
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
  console.log(nestedData);
  return { reducedData, nestedData };
}

export default logCurrentEventStatus;

// ARCHON

// {
// activation: '2023-08-21T00:00:00.000Z',
// startString: '-2h 23m 58s',
// expiry: '2023-08-28T00:00:00.000Z',
// active: true,
// rewardPool: 'Archon Sortie Rewards',
// missions: [
//   {
//     node: 'Alator (Mars)',
//     nodeKey: 'Alator (Mars)',
//     type: 'Extermination',
//     typeKey: 'Extermination',
//     nightmare: false,
//     archwingRequired: false,
//     isSharkwing: false,
//   },
//   {
//     node: 'Martialis (Mars)',
//     nodeKey: 'Martialis (Mars)',
//     type: 'Excavation',
//     typeKey: 'Excavation',
//     nightmare: false,
//     archwingRequired: false,
//     isSharkwing: false,
//   },
//   {
//     node: 'War (Mars)',
//     nodeKey: 'War (Mars)',
//     type: 'Assassination',
//     typeKey: 'Assassination',
//     nightmare: false,
//     archwingRequired: false,
//     isSharkwing: false,
//   }
// ],
// boss: 'Archon Amar',
// faction: 'Narmer',
// expired: false,
// eta: '6d 21h 36m 1s'
// }

// Vault trader
// {
//   activation: '2023-08-03T18:00:00.000Z',
//   startString: '-17d 8h 27m 58s',
//   expiry: '2023-09-07T18:00:00.000Z',
//   active: true,
//   location: "Maroo's Bazaar (Mars)",
//   inventory: [
//     { item: 'M P V Rhino Prime Single Pack', ducats: 6, credits: null },
//     {
//       item: 'M P V Rhino Nyx Prime Dual Pack',
//       ducats: 10,
//       credits: null
//     },
//     { item: 'M P V Nyx Prime Single Pack', ducats: 6, credits: null },
//     { item: 'Rhino Prime', ducats: 3, credits: null },
//     {
//       item: 'M P V Distilling Extractor Prime Set',
//       ducats: 1,
//       credits: null
//     },
//     { item: 'Noru Prime Syandana', ducats: 2, credits: null },
//     { item: 'Ankyros Prime', ducats: 2, credits: null },
//     { item: 'Boltor Prime', ducats: 2, credits: null },
//     { item: 'Nyx Prime', ducats: 3, credits: null },
//     { item: 'M P V Targis Prime Armor Set', ducats: 2, credits: null },
//     { item: 'Vala Sugatra Prime', ducats: 1, credits: null },
//     { item: 'Scindo Prime', ducats: 2, credits: null },
//     { item: 'Hikou Prime', ducats: 2, credits: null },
//     { item: 'Rhino Prime Bobble Head', ducats: 1, credits: null },
//     { item: 'Nyx Prime Bobble Head', ducats: 1, credits: null },
//     {
//       item: 'T1 Void Projection Rhino Nyx Vault A Bronze',
//       ducats: null,
//       credits: 1
//     },
//     {
//       item: 'T2 Void Projection Rhino Nyx Vault A Bronze',
//       ducats: null,
//       credits: 1
//     },
//     {
//       item: 'T3 Void Projection Rhino Nyx Vault A Bronze',
//       ducats: null,
//       credits: 1
//     },
//     {
//       item: 'T4 Void Projection Rhino Nyx Vault A Bronze',
//       ducats: null,
//       credits: 1
//     }
//   ]}
