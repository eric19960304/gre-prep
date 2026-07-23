export function startOfDay(date: Date): Date {
  const value = new Date(date)
  value.setHours(0, 0, 0, 0)
  return value
}

export function endOfDay(date: Date): Date {
  const value = new Date(date)
  value.setHours(23, 59, 59, 999)
  return value
}

export function isSameDay(left: Date, right: Date): boolean {
  return startOfDay(left).getTime() === startOfDay(right).getTime()
}

export function formatReviewDate(value: string, now = new Date()): string {
  const date = new Date(value)
  const difference = date.getTime() - now.getTime()
  if (difference <= 0) return 'Due now'
  if (isSameDay(date, now)) {
    return `Today, ${new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(date)}`
  }
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  if (isSameDay(date, tomorrow)) return 'Tomorrow'
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date)
}

export function daysAgo(days: number, now = new Date()): Date {
  const result = new Date(now)
  result.setDate(result.getDate() - days)
  return result
}
