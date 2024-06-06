import type { QrcodeErrorCallback, QrcodeSuccessCallback } from "html5-qrcode";
import { Dispatch, SetStateAction } from "react";

export type nama_hari =
  | "Minggu"
  | "Senin"
  | "Selasa"
  | "Rabu"
  | "Kamis"
  | "Jumat"
  | "Sabtu";

export type User = {
  user_id: number;
  username: string;
  NIU: string;
  email: string;
  password: string;
};

type UserStatus = "Siswa" | "Guru";
export interface CurrentUser extends User {
  status?: UserStatus;
}

export type Jadwal = {
  user_ref: string;
  Jadwal: {
    hari: nama_hari;
    WaktuKelas: { jam: string; kelas: string }[];
  }[];
};
