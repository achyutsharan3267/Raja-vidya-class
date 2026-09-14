import { CheckCircle2, Circle, ClipboardCheck, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import "./StageManagementChecklist.css";

const checklistItems = [
  "Microphone (Mic)",
  "Glass and Covered Plate (for Water Bottle)",
  "Table Cloth",
  "Vyasasana Cloth",
  "Gifts for Quiz",
  "Bhagavad Gita (Hindi & English) – for Prabhuji",
  "Small Kartal",
  "Tripod",
  "Garland",
  "Wrapping Paper",
  "Tape",
  "Scissors",
];

const storageKey = "stage-management-checklist";

function getSavedItems(): boolean[] {
  try {
    const savedItems = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return checklistItems.map((_, index) => Boolean(savedItems[index]));
  } catch {
    return checklistItems.map(() => false);
  }
}

export function StageManagementChecklist() {
  const [completed, setCompleted] = useState<boolean[]>(getSavedItems);
  const completedCount = useMemo(
    () => completed.filter(Boolean).length,
    [completed],
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(completed));
  }, [completed]);

  const toggleItem = (index: number) => {
    setCompleted((current) =>
      current.map((isComplete, itemIndex) =>
        itemIndex === index ? !isComplete : isComplete,
      ),
    );
  };

  return (
    <section className="stage-checklist" aria-labelledby="stage-checklist-title">
      <div className="stage-checklist__header">
        <div>
          <div className="stage-checklist__eyebrow">
            <ClipboardCheck size={16} aria-hidden="true" />
            Event readiness
          </div>
          <h2 id="stage-checklist-title">Stage Management Checklist</h2>
          <p>Mark each item once it is arranged for the program.</p>
        </div>
        <div className="stage-checklist__summary" aria-label={`${completedCount} of ${checklistItems.length} items complete`}>
          <strong>{completedCount}/{checklistItems.length}</strong>
          <span>items ready</span>
        </div>
      </div>

      <div className="stage-checklist__progress" aria-hidden="true">
        <span style={{ width: `${(completedCount / checklistItems.length) * 100}%` }} />
      </div>

      <ul className="stage-checklist__items">
        {checklistItems.map((item, index) => {
          const isComplete = completed[index];
          return (
            <li key={item}>
              <button
                type="button"
                className={`stage-checklist__item ${isComplete ? "stage-checklist__item--complete" : ""}`}
                onClick={() => toggleItem(index)}
                aria-pressed={isComplete}
              >
                {isComplete ? <CheckCircle2 aria-hidden="true" /> : <Circle aria-hidden="true" />}
                <span>{item}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {completedCount > 0 && (
        <div className="stage-checklist__footer">
          <Button type="button" variant="ghost" size="sm" onClick={() => setCompleted(checklistItems.map(() => false))}>
            <RotateCcw size={15} aria-hidden="true" />
            Reset checklist
          </Button>
        </div>
      )}
    </section>
  );
}
