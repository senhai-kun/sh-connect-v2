import React from 'react'

export default function Duration ({ seconds }) {
  return (
    <time 
        dateTime={`P${Math.round(seconds)}S`} 
        style={{
            fontSize: '0.8rem',
            opacity: 0.8,
            fontWeight: 500,
            letterSpacing: 0.2,
            marginTop: 0
        }}
    >
      {format(seconds)}
    </time>
  )
}

function format (seconds) {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = pad(date.getUTCSeconds())
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`
  }
  return `${mm}:${ss}`
}

function pad (string) {
  return ('0' + string).slice(-2)
}