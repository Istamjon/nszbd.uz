"use client";

import * as React from "react";
import {
  User,
  Calculator,
  TrendingUp,
  Handshake,
  FileText,
  Network,
  Users,
} from "lucide-react";
import { Locale } from "@/i18n/config";

interface StructureDict {
  title: string;
  subtitle: string;
  chartTitle: string;
  chartSubtitle: string;
  nodes: {
    director: string;
    monitoring: string;
    investors: string;
    infraSpecialist: string;
    accountant: string;
    contractsLegal: string;
    zoneOfficers: string;
  };
}

interface StructureChartProps {
  dict: StructureDict;
  locale?: Locale;
}

export function StructureChart({ dict }: StructureChartProps) {
  // Left Branch Units (from Direksiya tuzilmasi.jpg)
  const leftUnits = [
    {
      id: "monitoring",
      title: dict.nodes.monitoring,
      icon: TrendingUp,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      id: "investors",
      title: dict.nodes.investors,
      icon: Handshake,
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      id: "infrastructure",
      title: dict.nodes.infraSpecialist,
      icon: Network,
      color: "text-sky-600 dark:text-sky-400",
    },
  ];

  // Right Branch Units (from Direksiya tuzilmasi.jpg)
  const rightUnits = [
    {
      id: "accountant",
      title: dict.nodes.accountant,
      icon: Calculator,
      color: "text-cyan-600 dark:text-cyan-400",
    },
    {
      id: "legal",
      title: dict.nodes.contractsLegal,
      icon: FileText,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      id: "zoneOfficers",
      title: dict.nodes.zoneOfficers,
      icon: Users,
      color: "text-indigo-600 dark:text-indigo-400",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      {/* ================= DESKTOP HIERARCHY TREE (>= md) ================= */}
      <div className="hidden md:block">
        {/* Level 0: Top Director Card */}
        <div className="flex justify-center">
          <div className="w-80 px-6 py-4 bg-white dark:bg-[#041438] border-2 border-[#0055aa] dark:border-[#3b82f6] rounded-md flex items-center justify-center gap-3.5 shadow-none">
            {/* Direct icon without background */}
            <User className="w-6 h-6 text-[#0055aa] dark:text-[#3b82f6] shrink-0" />
            <h3 className="text-base sm:text-lg font-extrabold tracking-wider text-slate-900 dark:text-white uppercase">
              {dict.nodes.director}
            </h3>
          </div>
        </div>

        {/* Vertical connector stem from Director down to Tree spine */}
        <div className="relative w-full h-10 flex justify-center">
          <svg className="w-6 h-10 overflow-visible pointer-events-none" viewBox="0 0 24 40">
            {/* Base Line */}
            <line
              x1="12"
              y1="0"
              x2="12"
              y2="40"
              className="stroke-slate-300 dark:stroke-slate-700"
              strokeWidth="2"
            />
            {/* Animated Flow Line */}
            <line
              x1="12"
              y1="0"
              x2="12"
              y2="40"
              stroke="#0055aa"
              strokeWidth="2"
              strokeDasharray="6 4"
              className="animate-flow-dash"
            />
          </svg>
        </div>

        {/* Central 3-Level Branched Grid */}
        <div className="space-y-6">
          {[0, 1, 2].map((idx) => {
            const left = leftUnits[idx];
            const right = rightUnits[idx];
            const LeftIcon = left.icon;
            const RightIcon = right.icon;
            const isLast = idx === 2;

            return (
              <div
                key={idx}
                className="grid grid-cols-[1fr_96px_1fr] items-center"
              >
                {/* Left Card */}
                <div className="flex justify-end">
                  <div className="w-full max-w-[380px] p-4 sm:p-5 bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 rounded-md flex items-center gap-4 transition-colors">
                    {/* Icon without background */}
                    <LeftIcon className={`w-6 h-6 shrink-0 ${left.color}`} />
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {left.title}
                    </span>
                  </div>
                </div>

                {/* Center Orthogonal Stepped Connector with Animated Line */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <svg
                    className="w-full h-24 overflow-visible pointer-events-none"
                    viewBox="0 0 96 96"
                    preserveAspectRatio="none"
                  >
                    {!isLast ? (
                      // Levels 0 and 1: Vertical spine straight through with orthogonal branches left & right
                      <>
                        {/* Base Vertical Spine */}
                        <line
                          x1="48"
                          y1="0"
                          x2="48"
                          y2="96"
                          className="stroke-slate-300 dark:stroke-slate-700"
                          strokeWidth="2"
                        />
                        {/* Base Horizontal Left Branch */}
                        <line
                          x1="48"
                          y1="48"
                          x2="0"
                          y2="48"
                          className="stroke-slate-300 dark:stroke-slate-700"
                          strokeWidth="2"
                        />
                        {/* Base Horizontal Right Branch */}
                        <line
                          x1="48"
                          y1="48"
                          x2="96"
                          y2="48"
                          className="stroke-slate-300 dark:stroke-slate-700"
                          strokeWidth="2"
                        />

                        {/* Animated Dash Stroke: Down Spine */}
                        <line
                          x1="48"
                          y1="0"
                          x2="48"
                          y2="96"
                          stroke="#0055aa"
                          strokeWidth="2"
                          strokeDasharray="6 4"
                          className="animate-flow-dash"
                        />
                        {/* Animated Dash Stroke: Left Branch */}
                        <line
                          x1="48"
                          y1="48"
                          x2="0"
                          y2="48"
                          stroke="#0055aa"
                          strokeWidth="2"
                          strokeDasharray="6 4"
                          className="animate-flow-dash-rev"
                        />
                        {/* Animated Dash Stroke: Right Branch */}
                        <line
                          x1="48"
                          y1="48"
                          x2="96"
                          y2="48"
                          stroke="#0055aa"
                          strokeWidth="2"
                          strokeDasharray="6 4"
                          className="animate-flow-dash"
                        />

                        {/* Junction Circle Node */}
                        <circle
                          cx="48"
                          cy="48"
                          r="4.5"
                          className="fill-white dark:fill-[#041438] stroke-slate-400 dark:stroke-slate-600"
                          strokeWidth="2"
                        />
                      </>
                    ) : (
                      // Level 2 (Last): Stepped elbow ("siniq chiziq") turning 90° into left and right
                      <>
                        {/* Base Stepped Left Branch (Elbow 90°) */}
                        <path
                          d="M 48,0 L 48,48 L 0,48"
                          className="stroke-slate-300 dark:stroke-slate-700"
                          strokeWidth="2"
                          fill="none"
                        />
                        {/* Base Stepped Right Branch (Elbow 90°) */}
                        <path
                          d="M 48,0 L 48,48 L 96,48"
                          className="stroke-slate-300 dark:stroke-slate-700"
                          strokeWidth="2"
                          fill="none"
                        />

                        {/* Animated Dash Left */}
                        <path
                          d="M 48,0 L 48,48 L 0,48"
                          stroke="#0055aa"
                          strokeWidth="2"
                          strokeDasharray="6 4"
                          className="animate-flow-dash"
                          fill="none"
                        />
                        {/* Animated Dash Right */}
                        <path
                          d="M 48,0 L 48,48 L 96,48"
                          stroke="#0055aa"
                          strokeWidth="2"
                          strokeDasharray="6 4"
                          className="animate-flow-dash"
                          fill="none"
                        />

                        {/* Corner Junction Node */}
                        <circle
                          cx="48"
                          cy="48"
                          r="4.5"
                          className="fill-white dark:fill-[#041438] stroke-slate-400 dark:stroke-slate-600"
                          strokeWidth="2"
                        />
                      </>
                    )}
                  </svg>
                </div>

                {/* Right Card */}
                <div className="flex justify-start">
                  <div className="w-full max-w-[380px] p-4 sm:p-5 bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 rounded-md flex items-center gap-4 transition-colors">
                    {/* Icon without background */}
                    <RightIcon className={`w-6 h-6 shrink-0 ${right.color}`} />
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {right.title}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= MOBILE HIERARCHY TREE (< md) ================= */}
      <div className="md:hidden space-y-4">
        {/* Director Card on Mobile */}
        <div className="p-4 bg-white dark:bg-[#041438] border-2 border-[#0055aa] dark:border-[#3b82f6] rounded-md flex items-center justify-center gap-3">
          <User className="w-5 h-5 text-[#0055aa] dark:text-[#3b82f6] shrink-0" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white uppercase">
            {dict.nodes.director}
          </h3>
        </div>

        {/* Mobile Vertical Spine with Stepped Orthogonal Branches */}
        <div className="relative pl-8 space-y-4 border-l-2 border-slate-300 dark:border-slate-700 ml-4">
          {/* Animated vertical spine on mobile */}
          <div className="absolute -left-[2px] top-0 bottom-0 w-[2px] overflow-hidden pointer-events-none">
            <div className="w-full h-full border-l-2 border-[#0055aa] border-dashed animate-pulse" />
          </div>

          {[...leftUnits, ...rightUnits].map((unit) => {
            const Icon = unit.icon;
            return (
              <div key={unit.id} className="relative">
                {/* Stepped Horizontal Tick Connector */}
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-slate-300 dark:bg-slate-700">
                  <div className="w-full h-full bg-[#0055aa] animate-pulse" />
                </div>
                {/* Junction Circle */}
                <div className="absolute -left-[35px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white dark:bg-[#041438] border-2 border-[#0055aa]" />

                {/* Card with Icon (No background) */}
                <div className="p-4 bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 rounded-md flex items-center gap-3.5">
                  <Icon className={`w-5 h-5 shrink-0 ${unit.color}`} />
                  <span className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                    {unit.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Embedded CSS for smooth hardware-accelerated animated flow lines */}
      <style jsx>{`
        @keyframes flowDash {
          from {
            stroke-dashoffset: 20;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes flowDashRev {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: 20;
          }
        }
        :global(.animate-flow-dash) {
          animation: flowDash 1.2s linear infinite;
        }
        :global(.animate-flow-dash-rev) {
          animation: flowDashRev 1.2s linear infinite;
        }
      `}</style>
    </div>
  );
}
