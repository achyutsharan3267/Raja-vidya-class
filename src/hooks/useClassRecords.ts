import { useCallback, useEffect, useState } from "react";
import { classRecordService } from "../services";
import type {
  ClassRecord,
  CreateClassRecordInput,
  UpdateClassRecordInput,
} from "../types/classRecord";

export function useClassRecords() {
  const [records, setRecords] = useState<ClassRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecords = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await classRecordService.getClassRecords();
      setRecords(data);
    } catch {
      setError("Failed to load class records");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRecords();
  }, [loadRecords]);

  const createRecord = useCallback(async (input: CreateClassRecordInput) => {
    const created = await classRecordService.createClassRecord(input);
    setRecords((current) =>
      [created, ...current].sort((a, b) => b.date.localeCompare(a.date)),
    );
    return created;
  }, []);

  const updateRecord = useCallback(
    async (id: string, input: UpdateClassRecordInput) => {
      const updated = await classRecordService.updateClassRecord(id, input);
      setRecords((current) =>
        current
          .map((record) => (record.id === id ? updated : record))
          .sort((a, b) => b.date.localeCompare(a.date)),
      );
      return updated;
    },
    [],
  );

  const deleteRecord = useCallback(async (id: string) => {
    await classRecordService.deleteClassRecord(id);
    setRecords((current) => current.filter((record) => record.id !== id));
  }, []);

  return {
    records,
    loading,
    error,
    reload: loadRecords,
    createRecord,
    updateRecord,
    deleteRecord,
  };
}
