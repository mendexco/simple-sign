'use client'

import { DashCard } from '@components/DashCard'

import { PROTECTED_ROUTES } from '@utils/constants'

export default function DashboardPage() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-2 sm:mt-24 px-10 pb-10 ">
      <DashCard
        route={PROTECTED_ROUTES.FILES_SENT}
        title="sent"
      />
      <DashCard
        route={PROTECTED_ROUTES.FILES_RECEIVED}
        title="received"
      />
      <DashCard
        route={PROTECTED_ROUTES.UPLOAD}
        title="upload"
      />
    </div>
  )
}
