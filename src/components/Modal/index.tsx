import Link from 'next/link'
import React, { MouseEventHandler, ReactNode } from 'react'

type modalProps = {
  id : string | undefined,
  redirect : string,
  children: ReactNode,
  modalTitle : string,
  largeModal? : boolean,
  closeModal? :MouseEventHandler | null
}


function Modal({redirect,id,children,modalTitle,largeModal,closeModal}:modalProps) {
  return (
    <dialog className="modal modal-open">
      <div className={`modal-box ${largeModal && ' w-11/12 max-w-5xl'}`}>
        <form method="dialog">
          {
            closeModal ? (
              <Link onClick={closeModal} href={redirect} className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6">✕</Link>
            ) : ( 
              <Link  href={redirect} className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6">✕</Link>
            )
          }
        </form>
        <h3 className="font-bold text-lg mb-2">{modalTitle}</h3>
        {children}
      </div>
    </dialog>
  )
}

export default Modal