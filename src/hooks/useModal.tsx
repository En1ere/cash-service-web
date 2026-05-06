'use client';
import { useState } from 'react';

export function useModal() {
    const [active, setActive] = useState(false);
    return {
        active,
        open: () => {
            console.log("open")
            setActive(true)
        }, close: () => setActive(false) };
}
