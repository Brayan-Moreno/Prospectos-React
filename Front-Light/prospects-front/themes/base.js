import { MainTheme } from './Schemas/MainTheme'

const themeMap = {
  MainTheme: MainTheme,
}

export function themeCreator(theme) {
  return themeMap[theme]
}
