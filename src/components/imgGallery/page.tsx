import React, { useState, useEffect } from "react";
import Image from "next/image";

export interface Props {
    images?: string[];
    columns?: number;
    columnsCountBreakPoints?: Record<number, number>;
    height?: number;
    gutter?: string;
    className?: string;
}

const ImageGrid: React.FC<Props> = ({
    images = [],
    columns = 4,
    columnsCountBreakPoints = { 480: 1, 640: 2, 768: 3 },
    gutter = "12px",
    className = "",
}) => {
    const [currentColumns, setCurrentColumns] = useState(columns);

    // Responsive columns logic
    useEffect(() => {
        const breakpoints = Object.keys(columnsCountBreakPoints)
            .map(Number)
            .sort((a, b) => a - b);

        function handleResize() {
            const width = window.innerWidth;
            let cols = columns;

            for (const bp of breakpoints) {
                if (width <= bp) {
                    cols = columnsCountBreakPoints[bp];
                    break;
                }
            }

            setCurrentColumns(cols);
        }

        window.addEventListener("resize", handleResize);
        handleResize(); // initial call

        return () => window.removeEventListener("resize", handleResize);
    }, [columnsCountBreakPoints, columns]);

    if (images.length === 0) return null;

    const distributedColumns: string[][] = Array.from(
        { length: currentColumns },
        () => []
    );

    images.forEach((img, i) => {
        distributedColumns[i % currentColumns].push(img);
    });

    return (
        <div
            className={`grid w-full ${className}`}
            style={{
                gridTemplateColumns: `repeat(${currentColumns}, 1fr)`,
                gap: gutter,
            }}
        >
            {distributedColumns.map((col, colIndex) => (
                <div
                    key={colIndex}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: gutter,

                    }}
                >
                    {col.map((src, imgIndex) => (
                        <div
                            key={imgIndex}
                            className="flex-1 relative overflow-hidden rounded-lg cursor-pointer group "
                            style={{
                                aspectRatio: "1/1",
                                minHeight: "150px"
                            }}
                        >
                            <Image
                                src={src}
                                alt={`Gallery Image ${imgIndex + 1}`}
                                fill
                                className="object-cover rounded-lg pointer-events-none select-none transition-transform duration-300 ease-in-out group-hover:scale-105 "
                                unoptimized
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ImageGrid;