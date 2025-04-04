"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/moving-border";

export default function MentalHealthPage() {
  const [step, setStep] = useState<number>(1);
  const [questions] = useState([
    "How do you usually deal with stress?",
    "What makes you feel happy and relaxed?",
    "Describe a recent challenge and how you handled it?",
    "What are three things you are grateful for today?",
    "If you could change one thing about your life, what would it be?"
  ]);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [analysis, setAnalysis] = useState<string>("");
  const [showBooking, setShowBooking] = useState<boolean>(false);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const responseText = answers.join(" ").toLowerCase();
    let suggestion = "";

    if (responseText.includes("stress") || responseText.includes("anxious")) {
      suggestion = "It looks like you are feeling stressed. Try deep breathing exercises or meditation.";
    } else if (responseText.includes("happy") || responseText.includes("grateful")) {
      suggestion = "You seem to have a positive mindset! Keep practicing gratitude and mindfulness.";
    } else {
      suggestion = "Based on your answers, it might help to talk to a professional. Consider booking a session.";
    }

    setAnalysis(suggestion);
    setStep(3);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Mental Health Assessment</h1>

      {step === 1 && (
        <div>
          <p className="text-lg">🔍 Answer the following questions to assess your mental health:</p>
          <Button onClick={() => setStep(2)}>Start Assessment</Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={index}>
              <p className="text-lg font-semibold">{q}</p>
              <textarea
                className="w-full p-2 border rounded-lg"
                rows={3}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              ></textarea>
            </div>
          ))}
          <Button onClick={handleSubmit}>Submit Answers</Button>
        </div>
      )}

      {step === 3 && (
        <div className="mt-8 p-6 border rounded-lg bg-white dark:bg-black">
          <h2 className="text-2xl font-bold mb-4">🩺 Analysis Results</h2>
          <p className="text-lg text-black dark:text-neutral-400">{analysis}</p>
          <Button onClick={() => setShowBooking(true)}>Book a Consultation</Button>
        </div>
      )}

      {showBooking && <BookingUI />}

      <div className="mt-8 flex justify-center space-x-4">
        {step > 1 && <Button onClick={() => setStep(step - 1)}>Back</Button>}
        {step < 3 && <Button onClick={() => setStep(step + 1)}>Next</Button>}
      </div>
    </div>
  );
}

function BookingUI() {
  return (
    <div className="mt-8 p-6 border rounded-lg bg-white dark:bg-black text-center">
      <h2 className="text-2xl font-bold">📅 Book a 1:1 Session</h2>
      <p className="text-lg">Select a time slot with a mental health professional.</p>
      <Button className="mt-4">Schedule Appointment</Button>
    </div>
  );
}
