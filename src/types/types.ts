export type User = {
  user_id: number,
  username: string,
  NIU: string,
  email: string,
  password: string,
}

export type Jadwal = {
  user_ref: string,
  Jadwal: {
    hari: string,
    WaktuKelas: { jam: string, kelas: string }[]
  }[]

}
