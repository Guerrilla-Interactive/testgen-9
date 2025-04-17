"use client";

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on escape key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // Prevent scrolling on the body when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    // Handle click outside to close
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    // Use createPortal to render modal at the end of document body
    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-opacity-50 p-4"
            onClick={handleBackdropClick}
            aria-modal="true"
            role="dialog"
            aria-label="Modal dialog"
        >
            <div
                ref={modalRef}
                className="w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
} 