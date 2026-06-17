import React from 'react'
import { Clock } from 'lucide-react'

const TransactionItem = ({ trx }) => {
  return (
    <div className="card bg-light mb-2">
      <div className="card-body d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <span className={`badge me-3 ${trx.type === 'Masuk' ? 'bg-success' : 'bg-warning text-dark'}`}>{trx.type}</span>
          <div>
            <div className="fw-semibold">{trx.item}</div>
            <div className="small text-muted">ID: {trx.id}</div>
          </div>
        </div>

        <div className="text-end">
          <div className="fw-bold">{trx.qty} Unit</div>
          <div className="small text-muted">{trx.time}</div>
        </div>
      </div>
    </div>
  )
}

export default TransactionItem
