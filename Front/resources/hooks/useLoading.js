const { useDispatch, useSelector } = require('react-redux')
const {
  loadingSelector,
  openLoading,
  closeLoading,
} = require('slices/loadingSlice')

export const useLoading = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(loadingSelector)

  const open = () => dispatch(openLoading())
  const close = () => dispatch(closeLoading())

  return { isLoading, open, close }
}
