import { Dispatch, SetStateAction } from "react";
import type { CurrentUser, nama_hari } from "./types";

export type MainComponentProps = {
  CurrentUser?: CurrentUser;
};

export interface JadRCProps extends MainComponentProps {
  HariIni: nama_hari
}

export type SidebarComponentProps = {
  CurrentUser?: CurrentUser;
};
export type QRScannerProps = {
  addUser: Dispatch<SetStateAction<(CurrentUser | undefined)[]>>;
};
