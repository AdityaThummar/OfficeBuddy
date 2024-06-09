import { create } from "zustand";
import { RecordItemType } from "./ExpenseState";

export type RecordActionStateProps = {
  selectMode: boolean;
  holdMode: boolean;
  selectedItems: RecordItemType[];
  holdedItem?: RecordItemType;
  toggleSelection: (item: RecordItemType) => void;
  onHoldItem: (item: RecordItemType) => void;
  closeHoldMode: () => void;
  closeSelection: () => void;
};

export const RecordActionState = create<RecordActionStateProps>((set) => {
  const onHoldItem = (item: RecordItemType) => {
    set((pre) => ({
      ...pre,
      holdMode: true,
      selectMode: false,
      holdedItem: item,
      selectedItems: [],
    }));
  };

  const toggleSelection = (item: RecordItemType) =>
    set((pre) => ({
      ...pre,
      holdMode: false,
      selectMode: true,
      holdedItem: undefined,
      selectedItems:
        pre.selectedItems.findIndex((_) => _.id === item.id) !== -1
          ? pre.selectedItems.filter((_) => _.id !== item.id)
          : [...pre.selectedItems, item],
    }));

  const closeHoldMode = () => {
    set((pre) => ({
      ...pre,
      holdMode: false,
      holdedItem: undefined,
    }));
  };

  const closeSelection = () => {
    set((pre) => ({
      ...pre,
      selectMode: false,
      selectedItems: [],
    }));
  };

  return {
    selectMode: false,
    holdMode: false,
    selectedItems: [],
    holdedItem: undefined,
    toggleSelection,
    onHoldItem,
    closeHoldMode,
    closeSelection,
  };
});
