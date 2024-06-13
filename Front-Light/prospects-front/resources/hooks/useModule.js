import { cleanNavbar, moduleSelector, setModule } from 'slices/moduleSlice'

const { useDispatch, useSelector } = require('react-redux')

export const useModule = () => {
  const dispatch = useDispatch()
  const moduleName = useSelector(moduleSelector)

  const set = (value) => dispatch(setModule(value))
  const clean = () => dispatch(cleanNavbar())

  return { moduleName, set, clean }
}
