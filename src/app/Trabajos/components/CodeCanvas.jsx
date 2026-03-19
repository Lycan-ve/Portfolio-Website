import { useState, useEffect } from "react";

export const CodeCanvas = ({ item, isPreview = true }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPreview && item?.rawCodeUrl) {
      setLoading(true);
      fetch(item.rawCodeUrl)
        .then((res) => res.text())
        .then((data) => {
          setCode(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [item, isPreview]);

  if (!item) return null;

  // --- VISTA REAL (ESTILO IDE PROFESIONAL) ---
  if (!isPreview) {
    const lines = code ? code.split("\n") : ["// Cargando..."];

    return (
      <div className="w-full h-full bg-[#0d0f14] flex flex-col font-jetbrains text-[13px] relative border-r border-white/5 selection:bg-blue-500/30">
        <div className="flex items-center px-4 py-2 bg-[#161b22] border-b border-white/5">
          <div className="flex items-center gap-2 bg-[#0d0f14] px-4 py-1.5 rounded-t-lg border-t border-x border-blue-500/40">
            <span className="text-blue-400 text-[10px]">Go</span>
            <span className="text-gray-200 text-xs font-medium">main.go</span>
          </div>
        </div>

        <div className="flex-1 overflow-auto custom-scrollbar flex bg-[#0d0f14]">
          <div className="w-12 flex-shrink-0 text-right pr-4 pt-4 text-gray-600 select-none border-r border-white/5 bg-[#0d0f14]/50 h-fit min-h-full">
            {lines.map((_, i) => (
              <div key={i} className="leading-6 text-[11px] opacity-50">{i + 1}</div>
            ))}
          </div>

          <div className="flex-1 relative group/code">
            <pre className="pl-6 pt-4 leading-6 whitespace-pre pb-24 overflow-x-auto custom-scrollbar">
              <code className="block">
                {code ? (
                  code.split("\n").map((line, i) => {
                    const highlightedLine = line
                      .replace(/(\/\/.*$)/g, '<span style="color: #5c6370; font-style: italic;">$1</span>')
                      .replace(/(["'`].*?["'`])/g, '<span style="color: #98c379;">$1</span>')
                      .replace(/\b(package|import|func|return|type|struct|interface|if|else|range|go|chan|const|var|select|switch|case|default|for|break|continue)\b/g, '<span style="color: #c678dd;">$1</span>')
                      .replace(/\b(string|int|int64|uint64|float64|bool|error|any|map|make|new|byte|rune)\b/g, '<span style="color: #e5c07b;">$1</span>')
                      .replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span style="color: #61afef;">$1</span>')
                      .replace(/\b(\d+|nil|true|false|iota|err)\b/g, '<span style="color: #d19a66;">$1</span>')
                      .replace(/(:=|!=|<=|>=|&&|\|\|)/g, '<span style="color: #56b6c2;">$1</span>');

                    return (
                      <div 
                        key={i} 
                        className="hover:bg-white/5 transition-colors w-full"
                        dangerouslySetInnerHTML={{ __html: highlightedLine || " " }} 
                      />
                    );
                  })
                ) : (
                  <span className="text-[#5c6370] italic">{"// " + (loading ? "Syncing source code..." : "Source not found")}</span>
                )}
              </code>
            </pre>
          </div>
        </div>

        <div className="px-4 py-1.5 bg-[#161b22] border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest">
          <div className="flex gap-4">
            <span>UTF-8</span>
            <span>Go 1.21</span>
          </div>
          <div className="text-blue-500/60 font-bold">{item.title}</div>
        </div>
      </div>
    );
  }

  // --- VISTA DECORATIVA (CARD GRID) ---
  const techStack = item.stack ? item.stack.split(',') : [];

  return (
    <div className="w-full h-full bg-[#0a0a0a] p-8 font-jetbrains text-[10px] overflow-hidden opacity-30 group-hover:opacity-100 transition-all duration-700 relative">
      <div className="flex gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-[#e06c75]/40" />
        <div className="w-2 h-2 rounded-full bg-[#d19a66]/40" />
        <div className="w-2 h-2 rounded-full bg-[#98c379]/40" />
      </div>
      
      <p className="text-[#c678dd] mb-1">package <span className="text-[#abb2bf]">main</span></p>
      <p className="text-[#c678dd] mb-4">import <span className="text-[#98c379]">{"\"github.com/gofiber/fiber/v2\""}</span></p>

      <p className="text-[#61afef]">func <span className="text-[#e5c07b]">Main</span>() {"{"}</p>
      <div className="pl-4 space-y-1 my-2">
        <p className="text-[#5c6370] italic">{"// " + (item.stack || "Stack")}</p>
        <p className="text-[#abb2bf]">project <span className="text-[#c678dd]">:=</span> {"\"" + item.title + "\""}</p>
        <p className="text-[#abb2bf]">status <span className="text-[#c678dd]">:=</span> <span className="text-[#d19a66]">200</span></p>
      </div>
      <p className="text-[#61afef]">{"}"}</p>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent pointer-events-none" />
    </div>
  );
};