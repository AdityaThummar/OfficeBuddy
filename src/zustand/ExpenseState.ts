import { create } from "zustand";
import { ZustandKeys } from "../appstrings";
import { createJSONStorage, persist } from "zustand/middleware";
import { configureMMKV } from "./ZustandFunctions";

export type RecordType = "income" | "expense";

export type RecordItemInnerRecordsType = {
  id: string;
  type: RecordType;
  value: number;
  initialSpent?: boolean;
  recordNote?: string;
};

export type RecordItemType = {
  id: string;
  title?: string;
  description?: string;
  date: number;
  itemRecords: RecordItemInnerRecordsType[];
  value: number;
  currency: string;
  type: RecordType;
};

export type AddUpdateRecordType = Pick<
  RecordItemType,
  "title" | "value" | "description" | "type" | "date"
>;

export type ExpenseStateValuesType = {
  expenses: any[];
  addExpense: (item: any) => void;
  removeExpense: (item: any) => void;
};

export const expenseState = create(
  persist<ExpenseStateValuesType>(
    (set) => {
      const addExpense = async (item: AddUpdateRecordType) => {
        const obj = {
          ...item,
        };
        set((pre) => ({
          ...pre,
          expenses: [
            ...(pre.expenses ?? []),
            { label: item, id: new Date().getTime() },
          ],
        }));
      };

      const removeExpense = async (item: any) => {
        set((pre) => ({
          ...pre,
          expenses: [...(pre?.expenses ?? []).filter((_) => item.id !== _.id)],
        }));
      };

      return {
        expenses: [
          {
            id: 1,
            title: "Pizza Lapinoze",
            description: "Bought total of 6 Pizzas worth 15",
            date: new Date().getTime(),
            itemRecords: [
              {
                id: 1,
                type: "expense",
                value: 26,
                initialSpent: true,
              },
              {
                id: 2,
                type: "income",
                value: 10,
                initialSpent: false,
                recordNote: "Paid by Bhargav",
              },
            ],
            value: 16,
            currency: "$",
            type: "expense",
          },
          {
            id: 2,
            description: "Bought total of 6 Pizzas worth 15",
            date: new Date().getTime(),
            itemRecords: [
              {
                id: 1,
                type: "expense",
                value: 26,
                initialSpent: true,
              },
              {
                id: 2,
                type: "income",
                value: 10,
                initialSpent: false,
                recordNote: "Paid by Bhargav",
              },
            ],
            value: 16,
            currency: "$",
            type: "expense",
          },
          {
            id: 3,
            date: new Date().getTime(),
            itemRecords: [
              {
                id: 1,
                type: "expense",
                value: 26,
                initialSpent: true,
              },
              {
                id: 2,
                type: "income",
                value: 10,
                initialSpent: false,
                recordNote: "Paid by Bhargav",
              },
            ],
            value: 16,
            currency: "$",
            type: "expense",
          },
          {
            id: 4,
            description: "Bought total of 6 Pizzas worth 15",
            date: new Date().getTime(),
            itemRecords: [
              {
                id: 1,
                type: "expense",
                value: 26,
                initialSpent: true,
              },
              {
                id: 2,
                type: "income",
                value: 10,
                initialSpent: false,
                recordNote: "Paid by Bhargav",
              },
            ],
            value: 16,
            currency: "$",
            type: "expense",
          },
          {
            id: 5,
            description: "Bought total of 6 Pizzas worth 15",
            date: new Date().getTime(),
            itemRecords: [
              {
                id: 1,
                type: "expense",
                value: 26,
                initialSpent: true,
              },
              {
                id: 2,
                type: "income",
                value: 10,
                initialSpent: false,
                recordNote: "Paid by Bhargav",
              },
            ],
            value: 16,
            currency: "$",
            type: "expense",
          },
          {
            id: 6,
            description: "Bought total of 6 Pizzas worth 15",
            date: new Date().getTime(),
            itemRecords: [
              {
                id: 1,
                type: "expense",
                value: 26,
                initialSpent: true,
              },
              {
                id: 2,
                type: "income",
                value: 10,
                initialSpent: false,
                recordNote: "Paid by Bhargav",
              },
            ],
            value: 16,
            currency: "$",
            type: "expense",
          },
          {
            id: 7,
            description: "Bought total of 6 Pizzas worth 15",
            date: new Date().getTime(),
            itemRecords: [
              {
                id: 1,
                type: "expense",
                value: 26,
                initialSpent: true,
              },
              {
                id: 2,
                type: "income",
                value: 10,
                initialSpent: false,
                recordNote: "Paid by Bhargav",
              },
            ],
            value: 16,
            currency: "$",
            type: "expense",
          },
          {
            id: 8,
            description: "Bought total of 6 Pizzas worth 15",
            date: new Date().getTime(),
            itemRecords: [
              {
                id: 1,
                type: "expense",
                value: 26,
                initialSpent: true,
              },
              {
                id: 2,
                type: "income",
                value: 10,
                initialSpent: false,
                recordNote: "Paid by Bhargav",
              },
            ],
            value: 16,
            currency: "$",
            type: "expense",
          },
          {
            id: 9,
            description: "Bought total of 6 Pizzas worth 15",
            date: new Date().getTime(),
            itemRecords: [
              {
                id: 1,
                type: "expense",
                value: 26,
                initialSpent: true,
              },
              {
                id: 2,
                type: "income",
                value: 10,
                initialSpent: false,
                recordNote: "Paid by Bhargav",
              },
            ],
            value: 16,
            currency: "$",
            type: "expense",
          },
          {
            id: 10,
            description: "Bought total of 6 Pizzas worth 15",
            date: new Date().getTime(),
            itemRecords: [
              {
                id: 1,
                type: "expense",
                value: 26,
                initialSpent: true,
              },
              {
                id: 2,
                type: "income",
                value: 10,
                initialSpent: false,
                recordNote: "Paid by Bhargav",
              },
            ],
            value: 16,
            currency: "$",
            type: "expense",
          },
        ],
        addExpense,
        removeExpense,
      };
    },
    {
      name: ZustandKeys.expenseState,
      storage: createJSONStorage(
        configureMMKV.bind(this, ZustandKeys.expenseState)
      ),
    }
  )
);
