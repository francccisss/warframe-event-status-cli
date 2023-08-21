import { traceDeprecation } from "process";
import { IWarframeEventStatus, IWarframeEvents } from "./types.js";
import Table from "cli-table";

async function logCurrentEventStatus(
  data: IWarframeEventStatus | undefined,
  wfEvents: IWarframeEvents
): Promise<void> {
  const flatVertTable = createFlatTable(data, "hor", "state", "timeLeft");
  console.log(flatVertTable);
}

function createFlatTable(
  data: IWarframeEventStatus | undefined,
  type: "vert" | "hor" = "vert",
  ...args: any[]
): string {
  let reducedData = {};
  const getKeys = Object.keys(data as object);
  if (args.length !== 0) {
    for (let i = 0; i < args.length; i++) {
      for (let j = 0; j < getKeys.length; j++) {
        // need to get all of the elements from getKeys
        if (args[i] === getKeys[j]) {
          console.log(args[i]);
          reducedData = { [args[i]]: data[args[i]], ...reducedData };
        } else {
          console.log("doesnt match any arguments");
        }
      }
    }
  }
  console.log(reducedData);
  if (type === "hor") {
    const createColWidths = getKeys.map((key) => {
      return 20;
    });
    var table = new Table({ head: getKeys, colWidths: createColWidths });
    const newTable = Object.values(data as object);
    table.push(newTable);
    return table.toString();
  } else if (type === "vert") {
    var table = new Table();
    for (const [key, value] of Object.entries(data as object)) {
      const newTable = { [key]: value };
      table.push(newTable);
    }
    return table.toString();
  } else {
    return "";
  }
}
export default logCurrentEventStatus;

// what to log from events
// {
//   isDay: true,
//   state: 'day',
//   isCetus: true,
//   shortString: '1h 17m to Night'
// }
// ______________________________
// | State  |       Time        |
// ------------------------------
// |  Day   |  1h 17mn to Night |
// ------------------------------

// BARO
// {
//   activation: '2023-08-25T13:00:00.000Z',
//   startString: '4d 10h 51m 1s',
//   expiry: '2023-08-27T13:00:00.000Z',
//   active: false,
//   character: "Baro Ki'Teer",
//   location: 'Strata Relay (Earth)',
//   inventory: [],
//   endString: '6d 10h 51m 1s',
//   schedule: []
// }

// FISSURES grouped within an array of the same relic type
// {
//     activation: '2023-08-21T02:20:01.834Z',
//     startString: '-1m 56s',
//     expiry: '2023-08-21T03:50:01.834Z',
//     active: true,
//     node: 'Lu-yan (Veil)',
//     missionType: 'Survival',
//     missionKey: 'Survival',
//     enemy: 'Corpus',
//     enemyKey: 'Corpus',
//     nodeKey: 'Lu-yan (Veil)',
//     tier: 'Axi',
//     tierNum: 4,
//     expired: false,
//     eta: '1h 28m 3s',
//     isStorm: true,
//     isHard: false
// }

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
//   ],
//   endString: '17d 15h 32m 1s',
//   initialStart: '2022-09-09T15:42:24.266Z',
//   completed: false,
//   schedule: [
//     {
//       expiry: '2022-11-03T18:00:00.000Z',
//       item: 'M P V Equinox Wukong Prime Dual Pack'
//     },
//     {
//       expiry: '2022-12-01T19:00:00.000Z',
//       item: 'M P V Valkyr Saryn Prime Dual Pack'
//     },
//     {
//       expiry: '2023-01-05T19:00:00.000Z',
//       item: 'M P V Oberon Prime Single Pack'
//     },
//     {
//       expiry: '2023-02-02T19:00:00.000Z',
//       item: 'M P V Volt Loki Prime Dual Pack'
//     },
//     {
//       expiry: '2023-03-02T19:00:00.000Z',
//       item: 'M P V Atlas Vauban Prime Dual Pack'
//     },
//     {
//       expiry: '2023-04-06T18:00:00.000Z',
//       item: 'M P V Nekros Oberon Prime Dual Pack'
//     },
//     {
//       expiry: '2023-05-04T18:00:00.000Z',
//       item: 'M P V Mag Rhino Prime Dual Pack'
//     },
//     {
//       expiry: '2023-06-02T15:00:00.000Z',
//       item: 'M P V Nekros Oberon Prime Dual Pack'
//     },
//     {
//       expiry: '2023-07-06T18:00:00.000Z',
//       item: 'M P V Inaros Ash Prime Dual Pack'
//     },
//     {
//       expiry: '2023-08-03T18:00:00.000Z',
//       item: 'M P V Banshee Mirage Prime Dual Pack'
//     },
//     {
//       expiry: '2023-09-07T18:00:00.000Z',
//       item: 'M P V Rhino Nyx Prime Dual Pack'
//     },
//     { expiry: '2023-10-05T18:00:00.000Z' },
//     { expiry: '2023-11-02T18:00:00.000Z' }
//   ]
// }

// ORB VALLIS
// {
//  id: 'vallisCycle1692584820000',
//  expiry: '2023-08-21T02:33:48.000Z',
//  isWarm: true,
//  state: 'warm',
//  activation: '2023-08-21T02:27:00.000Z',
//  timeLeft: '1m 49s',
//  shortString: '1m to Cold'
// }
