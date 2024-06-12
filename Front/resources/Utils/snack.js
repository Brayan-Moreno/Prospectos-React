import { useSnackbar } from 'notistack'

let useSnackbarRef
export const SnackbarUtilsConfigurator = () => {
  useSnackbarRef = useSnackbar()
  return null
}

export const Snack = {
  success(msg) {
    this.toast(msg, 'success')
  },
  warning(msg) {
    this.toast(msg, 'warning')
  },
  info(msg) {
    this.toast(msg, 'info')
  },
  error(msg) {
    this.toast(msg, 'error')
  },
  toast(msg, variant = 'default') {
    useSnackbarRef.enqueueSnackbar(msg, { variant, autoHideDuration: 3000 })
  },
}

export default Snack
