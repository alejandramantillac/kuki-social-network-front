export const formatDuration = (duration: string | null): string => {
  if (!duration) {
    return 'Invalid duration'
  }

  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/
  const matches = duration.match(regex)

  if (!matches) return 'Invalid duration'

  const hours = matches[1] ? `${matches[1]}h ` : ''
  const minutes = matches[2] ? `${matches[2]}m ` : ''
  const seconds = matches[3] ? `${parseFloat(matches[3]).toFixed(0)}s` : ''

  return `${hours}${minutes}${seconds}`.trim()
}
