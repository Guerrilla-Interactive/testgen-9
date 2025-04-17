"use client";

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Handle animation state
    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        }
    }, [isOpen]);

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

    if (!isOpen && !isAnimating) return null;

    // Use createPortal to render modal at the end of document body
    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300 ${isOpen ? 'opacity-100 bg-gray-900/50' : 'opacity-0 pointer-events-none'
                }`}
            onClick={handleBackdropClick}
            aria-modal="true"
            role="dialog"
            aria-label="Modal dialog"
            onTransitionEnd={() => {
                if (!isOpen) {
                    setIsAnimating(false);
                }
            }}
        >
            <div
                ref={modalRef}
                className={`w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
                    }`}
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