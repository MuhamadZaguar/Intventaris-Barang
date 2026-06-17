import React from 'react'

const StatCard = ({ title, value, Icon }) => {
  return (
    <div className="card card-rounded shadow-sm">
      <div className="card-body d-flex align-items-center gap-3">
        <div className="bg-light rounded p-3 d-flex align-items-center justify-content-center">
          {Icon ? <Icon /> : null}
        </div>
        <div>
          <div className="text-muted small text-uppercase">{title}</div>
          <div className="h4 mb-0">{value}</div>
        </div>
      </div>
    </div>
  )
}

export default StatCard
