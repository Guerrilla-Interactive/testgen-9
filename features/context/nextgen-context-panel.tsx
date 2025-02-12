"use client"

import React, { useState, type FC, useRef, useEffect } from "react"
import { useGlobalContext } from "./global-context"
import TogglePanel from "./nextgen-context-panel-toggle"

import Link from "next/link"
import { Fixed, Flex, FlexCol, FlexRow } from "../unorganized-components/nextgen-core-ui"
import { cn } from "../unorganized-utils/utils"

type Tab = "generalData" | "sessionStatus";

const evaluateStatus = (key: string, value: any): boolean => {
    return value === true || key.includes("true")
}

type DataCellProps = {
    data: any
    level?: number
}

const DataCell: FC<DataCellProps> = ({ data, level = 0 }) => {
    const prevDataRef = useRef(data);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        if (JSON.stringify(prevDataRef.current) !== JSON.stringify(data)) {
            setIsChanged(true);
            const timeoutId = setTimeout(() => setIsChanged(false), 1000);
            prevDataRef.current = data;
            return () => clearTimeout(timeoutId);
        }
    }, [data]);

    const dataStyle = isChanged ? { backgroundColor: 'yellow', transition: 'background-color 0.3s ease' } : {};

    const stringifyObject = (obj: any, depth = 0, indent = 0): string => {
        if (depth > 3 || obj === null || typeof obj !== 'object') {
            return JSON.stringify(obj);
        }

        const indentString = ' '.repeat(indent);
        const entries: string[] = Object.entries(obj).map(([key, value]) => {
            const stringValue: string = typeof value === 'object'
                ? stringifyObject(value, depth + 1, indent + 2)
                : JSON.stringify(value);
            return `\n${indentString}${key}: ${stringValue}`;
        });

        return `{${entries.join(', ')}\n${indentString}}`;
    };

    // Check if data is an array
    if (Array.isArray(data)) {
        return (
            <div style={{ paddingLeft: level * 2 }}>
                {data.map((item, index) => (
                    <div key={index} style={{ paddingLeft: level * 10 }}>
                        <pre>{stringifyObject(item, 0, level * 2 + 2)}</pre>
                    </div>
                ))}
            </div>
        );
    }

    // Handle single object data
    if (typeof data === 'object') {
        return (
            <pre style={{ paddingLeft: level * 10 }}>
                {stringifyObject(data, 0, level * 2 + 2)}
            </pre>
        );
    }

    // For non-object, non-array data
    return <span>{data != null ? data.toString() : 'null'}</span>;
};

const DataRow = React.memo<{ data: Record<string, any> }>(({ data }) => {
    return (
        <>
            {Object.keys(data).map((key) => (
                <FlexRow
                    className="justify-between max-h-[300px] scrollbar-hide overflow-y-scroll overflow-x-scroll gap-x-2 border-b border-b-gray-400 border-opacity-20 py-4"
                    key={key}
                >
                    <FlexRow className="gap-x-4">
                        <FlexCol>{key}:</FlexCol>
                    </FlexRow>
                    <FlexRow className="min-w-[12rem] gap-x-2">
                        <FlexCol>
                            <DataCell data={data[key]} />
                        </FlexCol>
                        {typeof data[key] === "boolean" ? (
                            <StatusCircle status={data[key]} />
                        ) : null}
                    </FlexRow>
                </FlexRow>
            ))}
        </>
    );
});

export const NextgenContextStatusPanel: FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>("sessionStatus");
    // Now destructure sessionStatus as well as pathname from the global context
    const { pathname, sessionStatus } = useGlobalContext();

    if (process.env.NODE_ENV === "production") return null;

    // We want to show only the non-function properties from sessionStatus.
    const sessionStatusData = {
        ...Object.fromEntries(
            Object.entries(sessionStatus).filter(([_, value]) => typeof value !== "function")
        )
    };

    const renderContent = {
        generalData: <DataRow data={{ pathname }} />,
        sessionStatus: <DataRow data={sessionStatusData} />,
    };

    return (
        <Fixed bottom right className="bottom-12 right-12 !z-[999] w-fit">
            <TogglePanel title="Nextgen Context">
                <FlexCol className="max-h-[37.5rem] w-[60.5rem] overflow-y-scroll rounded-lg border-2 border-[#ffffff0a] bg-white bg-opacity-50 font-sans text-xs font-light backdrop-blur-lg">
                    <Flex className="gap-6 overflow-x-scroll border-b-[1px] border-gray-400 border-opacity-20 bg-opacity-20 py-6 scrollbar-hide">
                        {(["generalData", "sessionStatus"] as Tab[]).map((tab) => (
                            <button
                                key={tab}
                                className={cn(
                                    activeTab === tab ? "active-tab font-bold" : "",
                                    "whitespace-nowrap opacity-80 first:ml-6 last:mr-6"
                                )}
                                onClick={() => setActiveTab(tab)}
                                type="button"
                            >
                                {tab}
                            </button>
                        ))}
                    </Flex>
                    <div className="px-6 pt-5">{renderContent[activeTab]}</div>
                </FlexCol>
                <FlexRow className="gap-x-2">
                    <Link
                        className="flex px-4 py-2 bg-white border-white border-opacity-20 border rounded-xl mt-4 text-xs opacity-70 hover:opacity-100 active:opacity-70"
                        href="/"
                    >
                        /dashboard
                    </Link>
                    <Link
                        className="flex px-4 py-2 bg-white border-white border-opacity-20 border rounded-xl mt-4 text-xs opacity-70 hover:opacity-100 active:opacity-70"
                        href="/projects"
                    >
                        /projects
                    </Link>
                    <Link
                        className="flex px-4 py-2 bg-white border-white border-opacity-20 border rounded-xl mt-4 text-xs opacity-70 hover:opacity-100 active:opacity-70"
                        href="/projects/sitemap"
                    >
                        /sitemap
                    </Link>
                </FlexRow>
            </TogglePanel>
        </Fixed>
    );
};

type StatusCircleProps = {
    status: boolean;
};

const StatusCircle: FC<StatusCircleProps> = ({ status }) => {
    const circleClass = status ? "bg-green-500" : "bg-red-500";
    return <div className={`h-4 w-4 rounded-full ${circleClass}`} />;
};
