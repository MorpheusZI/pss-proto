import dayjs from "dayjs"
import type { CurrentUser, User, nama_hari } from "~/types/types"


export function ambilHari(): nama_hari | undefined {
  const date = dayjs()
  const Hari: nama_hari[] = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
  return Hari[date.day()]
}

export function IdentifyUserStatus(user: User): CurrentUser {
  const UserWithStatus: CurrentUser = { ...user };

  if (user.NIU.startsWith("22")) {
    UserWithStatus.status = "Siswa"
  }

  if (user.NIU.startsWith("0")) {
    UserWithStatus.status = "Guru"
  }

  return UserWithStatus
}

