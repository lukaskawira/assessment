export interface Events {
  items: EventList[];
  totalCount: number;
}

export interface EventList {
  name: string;
  description: string;
  eventType: number;
  dateFrom: Date;
  dateTo: Date;
  time: string;
  subEvents?: SubEvents[]; // Optional parameter
}

interface SubEvents {
  name: string;
  description: string;
  eventType: number;
  dateFrom: Date;
  dateTo: Date;
  time: string;
}

export interface EventError {
  error: {
    code: string;
    message: string;
    details: string;
    data: {
      additionalProp1: string;
      additionalProp2: string;
      additionalProp3: string;
    };
    validationErrors: ValidationErrors[];
  };
}

interface ValidationErrors {
  message: string;
  members: string[];
}
