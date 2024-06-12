import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { permissionsSelector } from 'slices/userSlice'

export const useActions = () => {
  const { pathname } = useRouter()
  const modules = useSelector(permissionsSelector)
  const temp = pathname.split('/')
  let [module] = modules.filter((p) => temp[1] === p.url)

  if (!module && modules.length) {
    for (let idx = 0; idx < modules.length; idx++) {
      const mod = modules[idx]
      if (mod.subModules.length) {
        for (let idx = 0; idx < mod.subModules.length; idx++) {
          const sub = mod.subModules[idx]
          let url = `/${sub.url}`
          if (temp[temp.length - 1] === 'detail') {
            url += '/detail'
          }
          if (pathname === url) {
            module = sub
            break
          }
        }
      }
    }
  }

  if (!module) return []

  return module.actions
}

