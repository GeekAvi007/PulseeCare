"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/moving-border";

type Language = "en" | "hi" | "bn";

const descriptions: Record<Language, string> = {
    en: "Ensure the ECG nodes are properly placed on your chest, wrists, and ankles as shown in the guide.",
    hi: "सुनिश्चित करें कि ECG नोड्स को आपके सीने, कलाई और टखनों पर मार्गदर्शिका में दिखाए गए अनुसार सही ढंग से रखा गया है।",
    bn: "নিশ্চিত করুন যে ECG নোডগুলি আপনার বুক, কব্জি এবং গোড়ালির উপর নির্দেশিকায় দেখানো অনুযায়ী সঠিকভাবে স্থাপন করা হয়েছে।",
};

export default function ECGTestPage() {
    const [isRunning, setIsRunning] = useState(false);
    const [language, setLanguage] = useState<Language>("en");

    const toggleECG = () => setIsRunning((prev) => !prev);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">ECG Testing</h1>

            {/* Embedded Real-Time ECG Dashboard */}
            <div className="border border-gray-300 p-6 rounded-lg bg-white dark:bg-black shadow-md">
                <h2 className="text-xl font-semibold mb-4">Real-Time ECG Monitoring</h2>
                
                {/* Embedded ECG Dashboard */}
                <iframe
                    src="https://industrial.ubidots.com/app/dashboards/67efb6617bb9691e4e033d71?layer=67efb6627bb9691e4e033d8a&devices=67efb69b6d7f921fa09322e0"
                    width="100%"
                    height="600"
                    className="border rounded-lg shadow-md"
                ></iframe>

                <div className="mt-4 flex space-x-4">
                    <Button onClick={toggleECG}>{isRunning ? "Stop ECG" : "Start ECG"}</Button>
                </div>
            </div>

            {/* Node Placement Guide */}
            <div className="mt-8 p-4 border rounded-lg bg-white dark:bg-black shadow-md">
                <h2 className="text-2xl font-bold mb-2">ECG Node Placement Guide</h2>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw6g7DQUb3wtFZPxMj2rOxqmW3qBBC9p13jg&s"
                    alt="ECG Node Placement Guide"
                    className="rounded-lg mb-4 w-full h-auto"
                />
                <div className="mb-4">
                    <label className="text-sm font-bold">Choose Language:</label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                        className="ml-2 border border-gray-300 rounded-md p-1"
                    >
                        <option value="en">English</option>
                        <option value="hi">हिन्दी</option>
                        <option value="bn">বাংলা</option>
                    </select>
                </div>
                <p className="mt-4 text-gray-700">{descriptions[language]}</p>
            </div>
        </div>
    );
}
