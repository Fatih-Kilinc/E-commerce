"use client";
import Image from 'next/image';
import React from 'react'
import { ClipLoader } from 'react-spinners';

const ImageLoad = ({ src, alt, width = 200, height = 200, fill = false, fit = false, className }) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);
    return (
        <div className='relative '>
            {!imageLoaded &&
                <div className="absolute text-black flex w-full items-center justify-center h-full">
                    <ClipLoader
                        color="#F38332"
                        size={13}
                    />
                </div>
            }

            <Image
                src={src ?? '/img/no-photo.png'}
                {...((fill || fit) ? {} : { height })}
                {...((fill || fit) ? {} : { width })}
                title={alt}
                onLoad={(e) => {
                    setImageLoaded(true);
                }}
                alt={alt ?? 'image'}
                className={`${className} rounded-xl`}
                fill={fill}
                fit={fit.toString()}
            />
        </div>
    )
}

export default ImageLoad