// Application Data Types
export interface Application {
  ApplicationID: string; // GUID
  Name: string; // Text (Single Line)
  Release: string; // Text (Single Line)
  ID: string; // Text (Single Line)
  Alias: string; // Text (Single Line)
  Description: string; // Text (Multiple Lines)
  Subtype: string; // Choice
  TIME: string; // Choice
  TIMEDescription: string; // Text (Multiple Lines)
  BusinessCriticality: string; // Choice
  BusinessCriticalityDescription: string; // Text (Multiple Lines)
  FunctionalFit: string; // Choice
  FunctionalFitDescription: string; // Text (Multiple Lines)
  TechnicalFit: string; // Choice
  TechnicalFitDescription: string; // Text (Multiple Lines)
  SingleSignOn: string; // Choice
  SSOProvider: string; // Text (Single Line)
  HostingType: string; // Choice
  HostingTypeDescription: string; // Text (Multiple Lines)
  // Date fields
  Plan?: string; // Date
  PhaseIn?: string; // Date
  Active?: string; // Date
  PhaseOut?: string; // Date
  EndOfLife?: string; // Date
  // Lookup fields (Many-to-Many)
  Transformation?: string[]; // Lookup (Many-to-Many)
  BusinessCapability?: string[]; // Lookup (Many-to-Many)
  BusinessContext?: string[]; // Lookup (Many-to-Many)
  ITComponent?: string[]; // Lookup (Many-to-Many)
  Interface?: string[]; // Lookup (Many-to-Many)
  DataObject?: string[]; // Lookup (Many-to-Many)
  // People lookup fields
  Stakeholders?: string[]; // Lookup (Users)
  Team?: string[]; // Lookup (Teams)
  Organisation?: string[]; // Lookup (Organisation Units)
  // Milestones
  Milestones?: Array<{ id: string; name: string; date: string }>; // Custom milestones with name and date
}

// Choice field values
export const SubtypeOptions = [
  "Web Application",
  "Mobile Application",
  "Desktop Application",
  "API Service",
] as const;

export const TIMEOptions = [
  "Tier 1",
  "Tier 2",
  "Tier 3",
  "Tier 4",
] as const;

export const BusinessCriticalityOptions = [
  "Low",
  "Medium",
  "High",
  "Critical",
] as const;

export const FunctionalFitOptions = [
  "Poor",
  "Fair",
  "Good",
  "Excellent",
] as const;

export const TechnicalFitOptions = [
  "Poor",
  "Fair",
  "Good",
  "Excellent",
] as const;

export const SingleSignOnOptions = [
  "Yes",
  "No",
  "Optional",
] as const;

export const HostingTypeOptions = [
  "On-Premise",
  "Cloud",
  "Hybrid",
] as const;

