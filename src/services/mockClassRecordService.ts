import { initialMockClassRecords } from "../data/mockClassRecords";
import type {
  ClassRecord,
  ClassRecordService,
  CreateClassRecordInput,
  UpdateClassRecordInput,
} from "../types/classRecord";

const MOCK_DELAY_MS = 400;

let records: ClassRecord[] = [...initialMockClassRecords];

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), MOCK_DELAY_MS);
  });
}

function generateId(): string {
  return crypto.randomUUID();
}

export const mockClassRecordService: ClassRecordService = {
  async getClassRecords(): Promise<ClassRecord[]> {
    return delay([...records].sort((a, b) => b.date.localeCompare(a.date)));
  },

  async createClassRecord(input: CreateClassRecordInput): Promise<ClassRecord> {
    const newRecord: ClassRecord = {
      id: generateId(),
      ...input,
    };
    records = [newRecord, ...records];
    return delay(newRecord);
  },

  async updateClassRecord(
    id: string,
    input: UpdateClassRecordInput,
  ): Promise<ClassRecord> {
    const index = records.findIndex((record) => record.id === id);
    if (index === -1) {
      throw new Error("Class record not found");
    }

    const updated: ClassRecord = { id, ...input };
    records = records.map((record) => (record.id === id ? updated : record));
    return delay(updated);
  },

  async deleteClassRecord(id: string): Promise<void> {
    const exists = records.some((record) => record.id === id);
    if (!exists) {
      throw new Error("Class record not found");
    }
    records = records.filter((record) => record.id !== id);
    return delay(undefined);
  },
};
