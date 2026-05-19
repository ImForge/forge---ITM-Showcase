(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/ui/Greeting.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Greeting)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function Greeting({ hasUser }) {
    _s();
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Greeting.useEffect": ()=>{
            const hour = new Date().getHours();
            const g = hour < 5 ? 'Up late' : hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : hour < 21 ? 'Good evening' : 'Good night';
            setText(g + (hasUser ? ', welcome back' : ' — sign in to get started'));
        }
    }["Greeting.useEffect"], [
        hasUser
    ]);
    if (!text) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        style: {
            fontSize: 12,
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 20
        },
        children: text
    }, void 0, false, {
        fileName: "[project]/components/ui/Greeting.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(Greeting, "4ujWDM02ns4tez/JXYjL1bw6ipA=");
_c = Greeting;
var _c;
__turbopack_context__.k.register(_c, "Greeting");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/ui/TrendingCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ArchiveCard": (()=>ArchiveCard),
    "AssignmentCard": (()=>AssignmentCard),
    "HeroProjectCard": (()=>HeroProjectCard),
    "SideProjectCard": (()=>SideProjectCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Cards as preserved artifacts — not posts.
// Classification marks, archive IDs, monospace metadata.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
'use client';
;
;
// ─── GRADIENT ENGINE ──────────────────────────────────────────────────────
function getGradient(seed) {
    const p = [
        {
            from: '#1a0f2e',
            to: '#0a0e1a',
            glow: 'rgba(139,92,246,0.5)'
        },
        {
            from: '#0d1f1a',
            to: '#060f14',
            glow: 'rgba(16,185,129,0.45)'
        },
        {
            from: '#1f0d0d',
            to: '#180800',
            glow: 'rgba(239,68,68,0.45)'
        },
        {
            from: '#0f1c2e',
            to: '#060a14',
            glow: 'rgba(59,130,246,0.45)'
        },
        {
            from: '#1a1200',
            to: '#180e00',
            glow: 'rgba(201,151,58,0.55)'
        },
        {
            from: '#1a0d1f',
            to: '#0c0814',
            glow: 'rgba(236,72,153,0.45)'
        },
        {
            from: '#0d1f1f',
            to: '#060e14',
            glow: 'rgba(6,182,212,0.45)'
        },
        {
            from: '#141a0d',
            to: '#0c1008',
            glow: 'rgba(132,204,22,0.4)'
        }
    ];
    let h = 0;
    for(let i = 0; i < seed.length; i++)h = seed.charCodeAt(i) + ((h << 5) - h);
    return p[Math.abs(h) % p.length];
}
function getInitials(t) {
    const w = t.trim().split(/\s+/);
    return w.length === 1 ? w[0].slice(0, 2).toUpperCase() : (w[0][0] + w[1][0]).toUpperCase();
}
function archiveId(id, idx) {
    const yr = new Date().getFullYear();
    return `${yr}/ITM/A-${String(idx + 1).padStart(3, '0')}`;
}
function PosterBg({ title, height }) {
    const g = getGradient(title);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: '100%',
            height,
            background: `linear-gradient(160deg, ${g.from}, ${g.to})`,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.08\'/%3E%3C/svg%3E")',
                    backgroundSize: '200px',
                    pointerEvents: 'none'
                }
            }, void 0, false, {
                fileName: "[project]/components/ui/TrendingCard.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: '-20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    height: '130%',
                    background: g.glow,
                    filter: 'blur(52px)',
                    opacity: 0.55,
                    pointerEvents: 'none'
                }
            }, void 0, false, {
                fileName: "[project]/components/ui/TrendingCard.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    bottom: '-30%',
                    right: '-10%',
                    width: '60%',
                    height: '100%',
                    background: g.glow,
                    filter: 'blur(64px)',
                    opacity: 0.18,
                    pointerEvents: 'none'
                }
            }, void 0, false, {
                fileName: "[project]/components/ui/TrendingCard.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: height * 0.44,
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.065)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    userSelect: 'none',
                    position: 'relative',
                    zIndex: 1
                },
                children: getInitials(title)
            }, void 0, false, {
                fileName: "[project]/components/ui/TrendingCard.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '60%',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.72))',
                    pointerEvents: 'none'
                }
            }, void 0, false, {
                fileName: "[project]/components/ui/TrendingCard.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/TrendingCard.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c = PosterBg;
function InitialSquare({ title, size = 48 }) {
    const g = getGradient(title);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: size,
            height: size,
            borderRadius: size * 0.22,
            flexShrink: 0,
            background: `linear-gradient(145deg, ${g.from}, ${g.to})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    background: g.glow,
                    filter: 'blur(10px)',
                    opacity: 0.65
                }
            }, void 0, false, {
                fileName: "[project]/components/ui/TrendingCard.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: size * 0.36,
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.6)',
                    position: 'relative',
                    zIndex: 1
                },
                children: getInitials(title)
            }, void 0, false, {
                fileName: "[project]/components/ui/TrendingCard.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/TrendingCard.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_c1 = InitialSquare;
function HeroProjectCard({ project, archiveIndex = 0 }) {
    _s();
    const tags = project.project_tags?.map((pt)=>pt.tags).filter(Boolean) ?? [];
    const author = project.profiles;
    const members = project.project_members ?? [];
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const aid = archiveId(project.id, archiveIndex);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/projects/${project.id}`,
        style: {
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 20,
            overflow: 'hidden',
            textDecoration: 'none',
            background: 'var(--bg-surface)',
            border: '1px solid transparent',
            transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
            transform: hov ? 'translateY(-6px) scale(1.008)' : 'translateY(0) scale(1)',
            boxShadow: hov ? '0 32px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(201,151,58,0.18)' : '0 2px 20px rgba(0,0,0,0.1)'
        },
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'relative',
                    flex: '1 0 320px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PosterBg, {
                        title: project.title,
                        height: 320
                    }, void 0, false, {
                        fileName: "[project]/components/ui/TrendingCard.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: 14,
                            left: 14,
                            fontFamily: 'monospace',
                            fontSize: 9,
                            padding: '3px 10px',
                            borderRadius: 4,
                            background: 'rgba(0,0,0,0.45)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            color: 'rgba(201,151,58,0.8)',
                            letterSpacing: '0.12em'
                        },
                        children: aid
                    }, void 0, false, {
                        fileName: "[project]/components/ui/TrendingCard.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: 14,
                            right: 14,
                            display: 'flex',
                            gap: 6
                        },
                        children: [
                            `★ ${project.star_count}`,
                            `◎ ${project.views ?? 0}`
                        ].map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: 'monospace',
                                    fontSize: 10,
                                    padding: '3px 10px',
                                    borderRadius: 4,
                                    background: 'rgba(0,0,0,0.4)',
                                    backdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    color: 'rgba(255,255,255,0.55)'
                                },
                                children: l
                            }, l, false, {
                                fileName: "[project]/components/ui/TrendingCard.tsx",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/ui/TrendingCard.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '20px 24px'
                        },
                        children: [
                            tags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 6,
                                    marginBottom: 8
                                },
                                children: tags.slice(0, 3).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 9,
                                            padding: '2px 8px',
                                            borderRadius: 3,
                                            background: 'rgba(255,255,255,0.07)',
                                            backdropFilter: 'blur(8px)',
                                            border: '1px solid rgba(255,255,255,0.09)',
                                            color: 'rgba(255,255,255,0.5)',
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase'
                                        },
                                        children: t.name
                                    }, t.id, false, {
                                        fileName: "[project]/components/ui/TrendingCard.tsx",
                                        lineNumber: 103,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/ui/TrendingCard.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                                    fontSize: 34,
                                    fontWeight: 300,
                                    color: 'rgba(255,255,255,0.88)',
                                    lineHeight: 1.0,
                                    letterSpacing: '-0.02em',
                                    margin: 0
                                },
                                children: project.title
                            }, void 0, false, {
                                fileName: "[project]/components/ui/TrendingCard.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/TrendingCard.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/TrendingCard.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '20px 24px 24px'
                },
                children: [
                    project.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 14,
                            color: 'var(--text-secondary)',
                            lineHeight: 1.7,
                            marginBottom: 16,
                            fontWeight: 300
                        },
                        children: [
                            project.description.slice(0, 120),
                            project.description.length > 120 ? '…' : ''
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/TrendingCard.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            paddingTop: 14,
                            borderTop: '1px solid var(--border-subtle)',
                            fontSize: 12,
                            color: 'var(--text-muted)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 22,
                                    height: 22,
                                    borderRadius: '50%',
                                    background: 'var(--bg-overlay)',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 9,
                                    color: 'var(--accent)',
                                    flexShrink: 0
                                },
                                children: author?.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: author.avatar_url,
                                    style: {
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    },
                                    alt: ""
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/TrendingCard.tsx",
                                    lineNumber: 123,
                                    columnNumber: 35
                                }, this) : author?.username?.[0]?.toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/components/ui/TrendingCard.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: author?.full_name || author?.username
                            }, void 0, false, {
                                fileName: "[project]/components/ui/TrendingCard.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            members.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    opacity: 0.5
                                },
                                children: [
                                    "· ",
                                    members.length,
                                    " contributors"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/TrendingCard.tsx",
                                lineNumber: 126,
                                columnNumber: 34
                            }, this),
                            project.semester && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    marginLeft: 'auto',
                                    opacity: 0.5
                                },
                                children: project.semester
                            }, void 0, false, {
                                fileName: "[project]/components/ui/TrendingCard.tsx",
                                lineNumber: 127,
                                columnNumber: 32
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/TrendingCard.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/TrendingCard.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/TrendingCard.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(HeroProjectCard, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c2 = HeroProjectCard;
function SideProjectCard({ project, archiveIndex = 0 }) {
    _s1();
    const tags = project.project_tags?.map((pt)=>pt.tags).filter(Boolean) ?? [];
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const aid = archiveId(project.id, archiveIndex);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/projects/${project.id}`,
        style: {
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '16px 18px',
            borderRadius: 14,
            textDecoration: 'none',
            flex: 1,
            background: hov ? 'var(--bg-elevated)' : 'var(--bg-surface)',
            border: '1px solid transparent',
            transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
            transform: hov ? 'translateX(8px)' : 'translateX(0)',
            boxShadow: hov ? '0 8px 32px rgba(0,0,0,0.18)' : '0 1px 8px rgba(0,0,0,0.05)'
        },
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InitialSquare, {
                title: project.title,
                size: 52
            }, void 0, false, {
                fileName: "[project]/components/ui/TrendingCard.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    minWidth: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: 'monospace',
                            fontSize: 8,
                            color: 'var(--text-muted)',
                            letterSpacing: '0.1em',
                            marginBottom: 4,
                            opacity: 0.6
                        },
                        children: aid
                    }, void 0, false, {
                        fileName: "[project]/components/ui/TrendingCard.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            fontFamily: 'var(--font-cormorant), Georgia, serif',
                            fontSize: 20,
                            fontWeight: 400,
                            lineHeight: 1.15,
                            color: 'var(--text-primary)',
                            marginBottom: 5,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            letterSpacing: '-0.01em'
                        },
                        children: project.title
                    }, void 0, false, {
                        fileName: "[project]/components/ui/TrendingCard.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    project.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 12,
                            color: 'var(--text-muted)',
                            lineHeight: 1.5,
                            marginBottom: 5,
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        },
                        children: project.description
                    }, void 0, false, {
                        fileName: "[project]/components/ui/TrendingCard.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 8,
                            alignItems: 'center'
                        },
                        children: [
                            tags.slice(0, 2).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 9,
                                        color: 'var(--text-muted)',
                                        letterSpacing: '0.06em',
                                        textTransform: 'uppercase'
                                    },
                                    children: t.name
                                }, t.id, false, {
                                    fileName: "[project]/components/ui/TrendingCard.tsx",
                                    lineNumber: 167,
                                    columnNumber: 38
                                }, this)),
                            tags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: 'var(--border)',
                                    fontSize: 9
                                },
                                children: "·"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/TrendingCard.tsx",
                                lineNumber: 168,
                                columnNumber: 31
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 10,
                                    color: 'var(--accent)',
                                    opacity: 0.8
                                },
                                children: [
                                    "★ ",
                                    project.star_count
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/TrendingCard.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/TrendingCard.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/TrendingCard.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 20,
                    color: hov ? 'var(--accent)' : 'var(--border)',
                    transition: 'all 0.25s',
                    transform: hov ? 'translateX(3px)' : 'translateX(0)',
                    flexShrink: 0
                },
                children: "›"
            }, void 0, false, {
                fileName: "[project]/components/ui/TrendingCard.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/TrendingCard.tsx",
        lineNumber: 141,
        columnNumber: 5
    }, this);
}
_s1(SideProjectCard, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c3 = SideProjectCard;
function ArchiveCard({ project, archiveIndex = 0 }) {
    _s2();
    const tags = project.project_tags?.map((pt)=>pt.tags).filter(Boolean) ?? [];
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const aid = archiveId(project.id, archiveIndex);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/projects/${project.id}`,
        style: {
            borderRadius: 16,
            overflow: 'hidden',
            textDecoration: 'none',
            background: hov ? 'var(--bg-elevated)' : 'var(--bg-surface)',
            border: '1px solid transparent',
            transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
            transform: hov ? 'translateY(-5px) scale(1.012)' : 'translateY(0) scale(1)',
            boxShadow: hov ? '0 20px 48px rgba(0,0,0,0.22), 0 0 0 1px rgba(201,151,58,0.12)' : '0 1px 8px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column'
        },
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'relative'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PosterBg, {
                        title: project.title,
                        height: 96
                    }, void 0, false, {
                        fileName: "[project]/components/ui/TrendingCard.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '8px 14px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: 'var(--font-cormorant), Georgia, serif',
                                fontSize: 19,
                                fontWeight: 300,
                                color: 'rgba(255,255,255,0.82)',
                                lineHeight: 1.1
                            },
                            children: project.title
                        }, void 0, false, {
                            fileName: "[project]/components/ui/TrendingCard.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/TrendingCard.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: 8,
                            right: 10,
                            fontFamily: 'monospace',
                            fontSize: 8,
                            color: 'rgba(255,255,255,0.3)',
                            letterSpacing: '0.1em'
                        },
                        children: aid
                    }, void 0, false, {
                        fileName: "[project]/components/ui/TrendingCard.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/TrendingCard.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '12px 14px 16px',
                    flex: 1
                },
                children: [
                    project.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 12,
                            color: 'var(--text-muted)',
                            lineHeight: 1.55,
                            marginBottom: 10,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            fontWeight: 300
                        },
                        children: project.description
                    }, void 0, false, {
                        fileName: "[project]/components/ui/TrendingCard.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    display: 'flex',
                                    gap: 6,
                                    flexWrap: 'wrap'
                                },
                                children: tags.slice(0, 2).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 9,
                                            color: 'var(--text-muted)',
                                            letterSpacing: '0.06em',
                                            textTransform: 'uppercase'
                                        },
                                        children: t.name
                                    }, t.id, false, {
                                        fileName: "[project]/components/ui/TrendingCard.tsx",
                                        lineNumber: 215,
                                        columnNumber: 40
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/ui/TrendingCard.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 10,
                                    color: 'var(--accent)',
                                    opacity: 0.7,
                                    flexShrink: 0
                                },
                                children: [
                                    "★ ",
                                    project.star_count
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ui/TrendingCard.tsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/TrendingCard.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/TrendingCard.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/TrendingCard.tsx",
        lineNumber: 184,
        columnNumber: 5
    }, this);
}
_s2(ArchiveCard, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c4 = ArchiveCard;
function AssignmentCard({ assignment }) {
    _s3();
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fi = assignment.file_url?.endsWith('.pdf') ? {
        l: 'PDF',
        c: 'rgba(239,68,68,0.75)'
    } : assignment.file_url?.match(/\.(jpg|png|jpeg)/i) ? {
        l: 'IMG',
        c: 'rgba(59,130,246,0.75)'
    } : assignment.file_url?.endsWith('.docx') ? {
        l: 'DOC',
        c: 'rgba(59,130,246,0.75)'
    } : assignment.file_url?.endsWith('.pptx') ? {
        l: 'PPT',
        c: 'rgba(234,179,8,0.75)'
    } : {
        l: 'FILE',
        c: 'rgba(160,152,144,0.7)'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/assignments/${assignment.id}`,
        style: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: 16,
            padding: '16px 18px',
            borderRadius: 12,
            textDecoration: 'none',
            background: hov ? 'var(--bg-elevated)' : 'var(--bg-surface)',
            border: '1px solid transparent',
            transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
            transform: hov ? 'translateX(5px)' : 'translateX(0)',
            boxShadow: hov ? '0 6px 24px rgba(0,0,0,0.14)' : '0 1px 6px rgba(0,0,0,0.04)'
        },
        onMouseEnter: ()=>setHov(true),
        onMouseLeave: ()=>setHov(false),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontFamily: 'monospace',
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: fi.c,
                    paddingTop: 3,
                    flexShrink: 0,
                    minWidth: 28
                },
                children: fi.l
            }, void 0, false, {
                fileName: "[project]/components/ui/TrendingCard.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    minWidth: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: 'monospace',
                            fontSize: 8,
                            color: 'var(--text-muted)',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            marginBottom: 5
                        },
                        children: [
                            assignment.subject,
                            " · ",
                            assignment.semester
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/TrendingCard.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: 'var(--font-cormorant), Georgia, serif',
                            fontSize: 19,
                            fontWeight: 400,
                            color: 'var(--text-primary)',
                            lineHeight: 1.15,
                            marginBottom: 5,
                            letterSpacing: '-0.01em'
                        },
                        children: assignment.title
                    }, void 0, false, {
                        fileName: "[project]/components/ui/TrendingCard.tsx",
                        lineNumber: 243,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 11,
                            color: 'var(--text-muted)'
                        },
                        children: [
                            "@",
                            assignment.profiles?.username
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/TrendingCard.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/TrendingCard.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 16,
                    color: hov ? 'var(--accent)' : 'var(--border)',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                    paddingTop: 2
                },
                children: "›"
            }, void 0, false, {
                fileName: "[project]/components/ui/TrendingCard.tsx",
                lineNumber: 248,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/TrendingCard.tsx",
        lineNumber: 233,
        columnNumber: 5
    }, this);
}
_s3(AssignmentCard, "9/uAcqUQPQAY6db9qMgZXXwbOpM=");
_c5 = AssignmentCard;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "PosterBg");
__turbopack_context__.k.register(_c1, "InitialSquare");
__turbopack_context__.k.register(_c2, "HeroProjectCard");
__turbopack_context__.k.register(_c3, "SideProjectCard");
__turbopack_context__.k.register(_c4, "ArchiveCard");
__turbopack_context__.k.register(_c5, "AssignmentCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=components_ui_edff6714._.js.map