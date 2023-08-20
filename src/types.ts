export interface IWarframeEventStatus {
  [key: string]: any;
}

export interface IWarframeEvents {
  [event: string]: string;
}

export type Language =
  | "en"
  | "es"
  | "fr"
  | "it"
  | "ko"
  | "pl"
  | "pt"
  | "ru"
  | "zh"
  | "uk";

export interface IUserInput {
  eventType: string;
  language: Language;
}
