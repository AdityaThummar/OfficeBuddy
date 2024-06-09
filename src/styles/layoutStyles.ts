import { StyleSheet } from "react-native";
import { useStyles } from "../hooks";

export const layoutStyle = () =>
  useStyles(() =>
    StyleSheet.create({
      flex: {
        flex: 1,
      },
      centerCenter: {
        alignItems: "center",
        justifyContent: "center",
      },
      defaultMessage: {
        fontSize: 20,
        fontWeight: "500",
      },
      row: {
        flexDirection: "row",
      },
      rowICenter: {
        flexDirection: "row",
        alignItems: "center",
      },
      rowJCenter: {
        flexDirection: "row",
        justifyContent: "center",
      },
      rowICenterJCenter: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
      rowICenterJBetwewn: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      rowICenterJSpaceArou: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      },
      rowICenterJSpaceEve: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      },
      rowICenterJEnd: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
      },
      rowIStartJBetwewn: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
      },
    })
  );
