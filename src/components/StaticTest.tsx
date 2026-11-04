'use cache'
import { cacheLife } from 'next/cache'
import React from 'react'

export default async function StaticTest() {
    cacheLife('seconds')
  return (
    <div>Static : {Date.now()}</div>
  )
}
