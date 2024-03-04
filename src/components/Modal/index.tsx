import Link from 'next/link'
import React, { ReactNode } from 'react'

type modalProps = {
  id : string | undefined,
  redirect : string,
  children: ReactNode,
  modalTitle : string,
}


function Modal({redirect,id,children,modalTitle}:modalProps) {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <form method="dialog">
          <Link href={redirect} className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6">✕</Link>
        </form>
        <h3 className="font-bold text-lg mb-2">{modalTitle}</h3>
        {children}
      </div>
    </dialog>
  )
}

export default Modal