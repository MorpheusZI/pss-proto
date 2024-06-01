import type { Jadwal, User } from "~/types/types";

export const user: User[] = [
  {
    user_id: 1,
    username: "Rohajon, ST",
    NIU: "0170188005",
    email: "rohajon@mail.com",
    password: "12oh4jon"
  },
  {
    user_id: 2,
    username: "Ahmad Aby Ayyasi",
    NIU: "222310033",
    email: "aby@mail.com",
    password: "abingers"
  },
]

export const jadwal: Jadwal[] = [
  {
    user_ref: "0170188005",
    Jadwal: [
      {
        hari: "Senin",
        WaktuKelas: [
          { jam: "08:15 - 09:30", kelas: "XI RPL 2" },
          { jam: "09:30 - 11:30", kelas: "X TKJ 1" },
          { jam: "13:00 - 15:30", kelas: "X RPL 1" },
          { jam: "15:30 - 17:30", kelas: "XII RPL 2" },
        ]
      },
      {
        hari: "Selasa",
        WaktuKelas: [
          { jam: "08:00 - 10:00", kelas: "X TKJ 2" },
          { jam: "10:00 - 11:30", kelas: "X TKJ 1" },
          { jam: "13:00 - 14:30", kelas: "X RPL 1" },
          { jam: "14:30 - 16:00", kelas: "XII RPL 2" },
          { jam: "16:00 - 17:30", kelas: "XII RPL 2" },
        ]
      },
      {
        hari: "Rabu",
        WaktuKelas: [
          { jam: "08:15 - 09:30", kelas: "XI RPL 2" },
          { jam: "09:30 - 11:30", kelas: "X TKJ 1" },
          { jam: "13:00 - 15:30", kelas: "X RPL 1" },
          { jam: "15:30 - 17:30", kelas: "XII RPL 2" },
        ]
      },
      {
        hari: "Kamis",
        WaktuKelas: [
          { jam: "08:15 - 09:30", kelas: "XI RPL 2" },
          { jam: "09:30 - 11:30", kelas: "X TKJ 1" },
          { jam: "13:00 - 15:30", kelas: "X RPL 1" },
          { jam: "15:30 - 17:30", kelas: "XII RPL 2" },
        ]
      },
      {
        hari: "Jumat",
        WaktuKelas: [
          { jam: "08:00 - 10:00", kelas: "XI PKM 2" },
          { jam: "10:00 - 11:45", kelas: "X RPL 1" },
          { jam: "13:00 - 14:00", kelas: "XII RPL 1" },
          { jam: "14:00 - 15:30", kelas: "XI TKJ 2" },
          { jam: "15:30 - 17:00", kelas: "XI MM 3" },
        ]
      },
      {
        hari: "Sabtu",
        WaktuKelas: [
          { jam: "08:15 - 09:30", kelas: "XI RPL 2" },
          { jam: "09:30 - 11:30", kelas: "X TKJ 1" },
          { jam: "13:00 - 15:30", kelas: "X RPL 1" },
          { jam: "15:30 - 17:30", kelas: "XII RPL 2" },
        ]
      },
      {
        hari: "Minggu",
        WaktuKelas: [
          { jam: "08:15 - 09:30", kelas: "XI RPL 2" },
          { jam: "09:30 - 11:30", kelas: "X TKJ 1" },
          { jam: "13:00 - 15:30", kelas: "X RPL 1" },
          { jam: "15:30 - 17:30", kelas: "XII RPL 2" },
        ]
      },
    ]
  }
]
