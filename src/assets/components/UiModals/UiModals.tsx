'use client'

import { useRef, type ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './UiModals.scss'

type UiModalProps = {
    triggerLabel?: string
    triggerContent?: ReactNode
    triggerInnerClass?: string
    title?: string
    children?: ReactNode
    modalBoxInnerClass?: string
    actionSlotContent?: ReactNode
    openNonce?: number
}

export default function UiModal({
    triggerLabel,
    triggerContent,
    triggerInnerClass = '',
    title,
    children,
    modalBoxInnerClass,
    actionSlotContent,
    openNonce,
}: UiModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const lastOpenNonceRef = useRef<number | undefined>(openNonce)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    function openDialog() {
        const dialog = dialogRef.current
        if (!dialog || dialog.open) {
            return
        }
        dialog.showModal()
    }

    useEffect(() => {
        if (openNonce === undefined) {
            return
        }

        if (lastOpenNonceRef.current === openNonce) {
            return
        }

        lastOpenNonceRef.current = openNonce

        openDialog()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openNonce])

    return (
        <>
            <button className={triggerInnerClass} onClick={openDialog}>
                {triggerContent ?? triggerLabel}
            </button>

            {isMounted &&
                createPortal(
                    <dialog ref={dialogRef} className="modal modal-bottom z-50 lg:modal-middle">
                        <div
                            className={`modal-box p-0 flex flex-col overflow-hidden ${modalBoxInnerClass ?? ''}`}
                        >
                            <div className="">
                                <h3 className="">{title}</h3>
                                <form method="dialog">
                                    <button type="submit" className="" aria-label="close">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15 5L5 15"
                                                stroke="#656565"
                                                strokeWidth="1.66667"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M5 5L15 15"
                                                stroke="#656565"
                                                strokeWidth="1.66667"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </form>
                            </div>

                            <div
                                className={`px-4 lg:px-6 overflow-y-auto flex-1 scroll-mb-4 lg:scroll-mb-6 ${!actionSlotContent ? 'pb-9 lg:pb-6' : ''}`}
                            >
                                {children}
                            </div>

                            {actionSlotContent && (
                                <div className="modal-action m-0 p-4 lg:p-6 shrink-0">
                                    {actionSlotContent}
                                </div>
                            )}
                        </div>

                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>,
                    document.body,
                )}
        </>
    )
}
