import dayjs from "dayjs"
import type { CurrentUser, User, nama_hari } from "~/types/types"

export function ambilHari(): nama_hari | undefined {
  const date = dayjs()
  const Hari: nama_hari[] = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
  return Hari[date.day()]
}

export function IdentifyUserStatus(user: User): CurrentUser {

  let UserWithStatus: CurrentUser = { ...user };

  const matchSiswa = new RegExp(/^22/)
  const matchGuru = new RegExp(/^0/)

  if (matchSiswa.test(user.NIU)) {
    UserWithStatus.status = "Siswa"
  }

  if (matchGuru.test(user.NIU)) {
    UserWithStatus.status = "Guru"
  }

  return UserWithStatus
}
