
import { Jadwal, User } from "~/types/types";

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
        hari: "senin",
        WaktuKelas: [
          { jam: "08:15 - 09:30", kelas: "XI RPL 2" },
          { jam: "09:30 - 11:30", kelas: "X TKJ 1" },
          { jam: "13:00 - 15:30", kelas: "X RPL 1" },
          { jam: "15:30 - 17:30", kelas: "XII RPL 2" },
        ]
      }
    ]
  }
]
