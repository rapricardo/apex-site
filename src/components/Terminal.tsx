import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, ShieldCheck, AlertTriangle, CheckCircle2, Activity } from 'lucide-react';

interface LogEntry {
  id: number;
  text: string;
  status?: 'success' | 'warning' | 'error' | 'process';
  timestamp: string;
}

interface TerminalProps {
  triggerAudit: boolean;
  targetUrl: string;
}

export const Terminal: React.FC<TerminalProps> = ({ triggerAudit, targetUrl }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Initial "idle" logs
  useEffect(() => {
    const initialLogs = [
      { id: 1, text: "System initialized. Waiting for target...", status: 'process', timestamp: new Date().toLocaleTimeString() },
      { id: 2, text: "APEX Protocol v4.2.1 ready.", status: 'success', timestamp: new Date().toLocaleTimeString() },
    ] as LogEntry[];
    setLogs(initialLogs);
  }, []);

  // Audit simulation logs
  useEffect(() => {
    if (!triggerAudit) return;

    let step = 0;
    const auditSequence = [
      { text: `Connecting to target: ${targetUrl || 'localhost'}...`, status: 'process' },
      { text: "Handshake established. [20ms latency]", status: 'success' },
      { text: "Scanning pixel configuration...", status: 'process' },
      { text: "WARNING: Meta Pixel misconfigured. Event duplication detected.", status: 'warning' },
      { text: "Accessing CNAE database reference...", status: 'process' },
      { text: "Analyzing competitor ad spend volume...", status: 'process' },
      { text: "Detected inefficient bidding strategy.", status: 'warning' },
      { text: "Enrichment protocol initiated.", status: 'success' },
      { text: "Finding C-Level contacts via LinkedIn API...", status: 'process' },
      { text: "AUDIT COMPLETE. Generative Report Ready.", status: 'success' },
    ];

    const interval = setInterval(() => {
      if (step >= auditSequence.length) {
        clearInterval(interval);
        return;
      }

      const newLog: LogEntry = {
        id: Date.now() + step,
        text: auditSequence[step].text,
        status: auditSequence[step].status as any,
        timestamp: new Date().toLocaleTimeString()
      };

      setLogs(prev => [...prev, newLog]);
      step++;
    }, 800);

    return () => clearInterval(interval);
  }, [triggerAudit, targetUrl]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getIcon = (status?: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 className="w-3 h-3 text-emerald-500" />;
      case 'warning': return <AlertTriangle className="w-3 h-3 text-yellow-500" />;
      case 'process': return <Activity className="w-3 h-3 text-blue-500" />;
      default: return <TerminalIcon className="w-3 h-3 text-gray-500" />;
    }
  };

  return (
    <div className="w-full h-[400px] bg-apex-panel rounded-lg border border-gray-800 overflow-hidden shadow-2xl flex flex-col font-mono text-xs md:text-sm relative">
      {/* Header */}
      <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-gray-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-50"></div>
        </div>
        <div className="text-gray-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>apex_daemon.exe — root</span>
        </div>
      </div>

      {/* Log Content */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto terminal-scroll space-y-2">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 items-start animate-fade-in">
            <span className="text-gray-600 shrink-0">[{log.timestamp}]</span>
            <span className="mt-0.5 shrink-0">{getIcon(log.status)}</span>
            <span className={`${
              log.status === 'success' ? 'text-emerald-400' : 
              log.status === 'warning' ? 'text-yellow-400' : 
              log.status === 'process' ? 'text-blue-400' : 'text-gray-300'
            }`}>
              {log.text}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2 text-emerald-500 mt-2">
          <span>{'>'}</span>
          <span className="blink-cursor w-2 h-4 bg-emerald-500 block"></span>
        </div>
      </div>

      {/* Overlay Scan Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-10 opacity-20"></div>
    </div>
  );
};

