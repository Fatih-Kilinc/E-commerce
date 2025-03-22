"use client";
import React from 'react'
import { ClipLoader } from 'react-spinners'

const LoadingComp = ({
    isLoading = false,
    color = '#1f2937',
    size = 25,
    rounded = 'rounded-md'
}) => {
    if (!isLoading) return null
    return (
        <div className={`top-0 flex items-center justify-center w-full h-full z-[99999999999999999] bg-[#004C74] bg-opacity-10 ${rounded} left-0`}>
            <ClipLoader color={color} size={size} />
        </div>
    )
}

export default LoadingComp