import React, { useEffect, useRef } from "react"
import './dialogModal.scss'

interface DialogModalTypes {
  openModal: boolean
  closeModal: () => void
  children: React.ReactNode
}

const DialogModal = ({ openModal, children, closeModal }: DialogModalTypes) => {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    // Handle escape key events to close the modal
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }
    
    if(openModal) {
      ref.current?.showModal()
      document.addEventListener('keydown', handleEscapeKey)
    } else {
      ref.current?.close()
      document.removeEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [openModal, closeModal])

  return (
    <dialog ref={ref} >
      {children}
    </dialog>
  )
}

export default DialogModal