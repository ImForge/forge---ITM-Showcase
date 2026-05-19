(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/lib/supabase/client.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "createClient": (()=>createClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Browser-side Supabase client
// Use this in Client Components ('use client') only
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
'use client';
;
function createClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://otrxayepvvmkdvdqiads.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_yDAkHmWMR3IGQLBcgQwAkg_JvM-jPIs"));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/ui/Toast.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Toast),
    "showToast": (()=>showToast)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Toast notification — import and call showToast() anywhere in client components
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
// Global event bus for toasts
const listeners = [];
function showToast(message, type = 'info') {
    const item = {
        id: Date.now(),
        message,
        type
    };
    listeners.forEach((fn)=>fn(item));
}
function Toast() {
    _s();
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const addToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Toast.useCallback[addToast]": (t)=>{
            setToasts({
                "Toast.useCallback[addToast]": (prev)=>[
                        ...prev,
                        t
                    ]
            }["Toast.useCallback[addToast]"]);
            setTimeout({
                "Toast.useCallback[addToast]": ()=>{
                    setToasts({
                        "Toast.useCallback[addToast]": (prev)=>prev.filter({
                                "Toast.useCallback[addToast]": (x)=>x.id !== t.id
                            }["Toast.useCallback[addToast]"])
                    }["Toast.useCallback[addToast]"]);
                }
            }["Toast.useCallback[addToast]"], 3500);
        }
    }["Toast.useCallback[addToast]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Toast.useEffect": ()=>{
            listeners.push(addToast);
            return ({
                "Toast.useEffect": ()=>{
                    const idx = listeners.indexOf(addToast);
                    if (idx > -1) listeners.splice(idx, 1);
                }
            })["Toast.useEffect"];
        }
    }["Toast.useEffect"], [
        addToast
    ]);
    const colors = {
        success: 'var(--success)',
        error: 'var(--danger)',
        info: 'var(--accent)'
    };
    if (!toasts.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            bottom: 24,
            right: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            zIndex: 9999
        },
        children: toasts.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-fade-up",
                style: {
                    background: 'var(--bg-elevated)',
                    border: `1px solid ${colors[t.type]}`,
                    borderLeft: `4px solid ${colors[t.type]}`,
                    borderRadius: 10,
                    padding: '12px 18px',
                    fontSize: 14,
                    color: 'var(--text-primary)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    maxWidth: 340,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: colors[t.type],
                            fontSize: 16
                        },
                        children: t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'
                    }, void 0, false, {
                        fileName: "[project]/components/ui/Toast.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this),
                    t.message
                ]
            }, t.id, true, {
                fileName: "[project]/components/ui/Toast.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/ui/Toast.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(Toast, "zh1GO6il2GJEBND600vYwey+WI0=");
_c = Toast;
var _c;
__turbopack_context__.k.register(_c, "Toast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/admin/AdminClient.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AdminClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Admin dashboard — approve/reject projects, manage users, view reports, manage tags
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function AdminClient({ pendingProjects: initPending, allProjects: initAll, reports, users: initUsers, tags: initTags, stats }) {
    _s();
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('pending');
    const [pending, setPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initPending);
    const [allProjects, setAll] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initAll);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initUsers);
    const [tags, setTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initTags);
    const [newTagName, setNewTagName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [processing, setProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ─── APPROVE/REJECT PROJECT ───
    async function moderateProject(projectId, status) {
        setProcessing(projectId);
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        await supabase.from('projects').update({
            status
        }).eq('id', projectId);
        setPending((prev)=>prev.filter((p)=>p.id !== projectId));
        setAll((prev)=>prev.map((p)=>p.id === projectId ? {
                    ...p,
                    status
                } : p));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showToast"])(status === 'approved' ? 'Project approved!' : 'Project rejected', status === 'approved' ? 'success' : 'info');
        setProcessing(null);
    }
    // ─── DELETE PROJECT ───
    async function deleteProject(projectId) {
        if (!confirm('Permanently delete this project?')) return;
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        await supabase.from('projects').delete().eq('id', projectId);
        setAll((prev)=>prev.filter((p)=>p.id !== projectId));
        setPending((prev)=>prev.filter((p)=>p.id !== projectId));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showToast"])('Project deleted');
    }
    // ─── CHANGE USER ROLE ───
    async function changeRole(userId, role) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        await supabase.from('profiles').update({
            role
        }).eq('id', userId);
        setUsers((prev)=>prev.map((u)=>u.id === userId ? {
                    ...u,
                    role
                } : u));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showToast"])(`Role changed to ${role}`, 'success');
    }
    // ─── ADD TAG ───
    async function addTag() {
        if (!newTagName.trim()) return;
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const { data } = await supabase.from('tags').insert({
            name: newTagName.trim()
        }).select().single();
        if (data) {
            setTags((prev)=>[
                    ...prev,
                    data
                ]);
            setNewTagName('');
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showToast"])('Tag created', 'success');
    }
    // ─── DELETE TAG ───
    async function deleteTag(id) {
        if (!confirm('Delete this tag? It will be removed from all projects.')) return;
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        await supabase.from('tags').delete().eq('id', id);
        setTags((prev)=>prev.filter((t)=>t.id !== id));
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["showToast"])('Tag deleted');
    }
    const tabStyle = (t)=>({
            padding: '9px 18px',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            background: tab === t ? 'var(--accent-dim)' : 'transparent',
            color: tab === t ? 'var(--accent)' : 'var(--text-secondary)',
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: tab === t ? 500 : 400,
            transition: 'all 0.15s',
            position: 'relative'
        });
    // Mini project row component
    function ProjectRow({ project, showModerate = false }) {
        const isProcessing = processing === project.id;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '16px 20px',
                borderBottom: '1px solid var(--border-subtle)'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: 48,
                        height: 48,
                        borderRadius: 8,
                        flexShrink: 0,
                        background: 'var(--bg-overlay)',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        color: 'var(--text-muted)'
                    },
                    children: project.thumbnail_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: project.thumbnail_url,
                        style: {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        },
                        alt: ""
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminClient.tsx",
                        lineNumber: 108,
                        columnNumber: 15
                    }, this) : '◫'
                }, void 0, false, {
                    fileName: "[project]/app/admin/AdminClient.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        flex: 1,
                        minWidth: 0
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/projects/${project.id}`,
                            style: {
                                fontSize: 14,
                                fontWeight: 500,
                                color: 'var(--text-primary)',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                display: 'block'
                            },
                            children: project.title
                        }, void 0, false, {
                            fileName: "[project]/app/admin/AdminClient.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 12,
                                color: 'var(--text-muted)',
                                marginTop: 2
                            },
                            children: [
                                "by @",
                                project.profiles?.username,
                                " · ",
                                new Date(project.created_at).toLocaleDateString()
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/AdminClient.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/AdminClient.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: 10,
                        padding: '3px 10px',
                        borderRadius: 99,
                        background: project.status === 'approved' ? 'rgba(74,124,89,0.1)' : project.status === 'pending' ? 'rgba(201,151,58,0.12)' : 'rgba(185,64,64,0.1)',
                        color: project.status === 'approved' ? 'var(--success)' : project.status === 'pending' ? 'var(--warning)' : 'var(--danger)'
                    },
                    children: project.status
                }, void 0, false, {
                    fileName: "[project]/app/admin/AdminClient.tsx",
                    lineNumber: 127,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        gap: 6
                    },
                    children: [
                        showModerate && project.status === 'pending' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>moderateProject(project.id, 'approved'),
                                    disabled: !!isProcessing,
                                    style: {
                                        padding: '6px 14px',
                                        borderRadius: 6,
                                        border: 'none',
                                        background: 'var(--success)',
                                        color: 'white',
                                        fontSize: 12,
                                        cursor: 'pointer',
                                        fontFamily: 'inherit'
                                    },
                                    children: isProcessing ? '…' : '✓ Approve'
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminClient.tsx",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>moderateProject(project.id, 'rejected'),
                                    disabled: !!isProcessing,
                                    style: {
                                        padding: '6px 14px',
                                        borderRadius: 6,
                                        border: '1px solid var(--danger)',
                                        background: 'none',
                                        color: 'var(--danger)',
                                        fontSize: 12,
                                        cursor: 'pointer',
                                        fontFamily: 'inherit'
                                    },
                                    children: "✕ Reject"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminClient.tsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>deleteProject(project.id),
                            style: {
                                padding: '6px 10px',
                                borderRadius: 6,
                                background: 'none',
                                border: '1px solid var(--border)',
                                color: 'var(--danger)',
                                fontSize: 12,
                                cursor: 'pointer'
                            },
                            children: "🗑"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/AdminClient.tsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/AdminClient.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/admin/AdminClient.tsx",
            lineNumber: 95,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            maxWidth: 1100,
            margin: '0 auto',
            padding: '48px 56px 80px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-fade-up",
                style: {
                    marginBottom: 40
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontFamily: 'var(--font-cormorant), Georgia, serif',
                            fontSize: 56,
                            fontWeight: 400,
                            lineHeight: 1,
                            marginBottom: 8
                        },
                        children: "Admin Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminClient.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 13,
                            color: 'var(--text-muted)'
                        },
                        children: "Forge moderation panel"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminClient.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/AdminClient.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-fade-up delay-1",
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: 12,
                    marginBottom: 36
                },
                children: [
                    {
                        label: 'Approved Projects',
                        value: stats.totalProjects,
                        warning: false
                    },
                    {
                        label: 'Pending Review',
                        value: pending.length,
                        warning: pending.length > 0
                    },
                    {
                        label: 'Users',
                        value: stats.totalUsers,
                        warning: false
                    },
                    {
                        label: 'Teams',
                        value: stats.totalTeams,
                        warning: false
                    },
                    {
                        label: 'Assignments',
                        value: stats.totalAssignments,
                        warning: false
                    },
                    {
                        label: 'Open Reports',
                        value: reports.length,
                        warning: reports.length > 0
                    }
                ].map(({ label, value, warning })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: warning && value > 0 ? 'var(--accent-light)' : 'var(--bg-surface)',
                            border: `1px solid ${warning && value > 0 ? 'rgba(201,151,58,0.4)' : 'var(--border-subtle)'}`,
                            borderRadius: 12,
                            padding: '20px 16px',
                            textAlign: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                                    fontSize: 36,
                                    fontWeight: 300,
                                    color: warning && value > 0 ? 'var(--accent)' : 'var(--text-primary)'
                                },
                                children: value
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminClient.tsx",
                                lineNumber: 206,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    color: 'var(--text-muted)',
                                    letterSpacing: '0.06em',
                                    textTransform: 'uppercase'
                                },
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminClient.tsx",
                                lineNumber: 212,
                                columnNumber: 13
                            }, this)
                        ]
                    }, label, true, {
                        fileName: "[project]/app/admin/AdminClient.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminClient.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-fade-up delay-2",
                style: {
                    display: 'flex',
                    gap: 4,
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 12,
                    padding: 4,
                    marginBottom: 28,
                    width: 'fit-content',
                    flexWrap: 'wrap'
                },
                children: [
                    {
                        t: 'pending',
                        label: `Pending (${pending.length})`
                    },
                    {
                        t: 'projects',
                        label: 'All Projects'
                    },
                    {
                        t: 'users',
                        label: `Users (${users.length})`
                    },
                    {
                        t: 'reports',
                        label: `Reports (${reports.length})`
                    },
                    {
                        t: 'tags',
                        label: 'Tags'
                    }
                ].map(({ t, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: tabStyle(t),
                        onClick: ()=>setTab(t),
                        children: label
                    }, t, false, {
                        fileName: "[project]/app/admin/AdminClient.tsx",
                        lineNumber: 232,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminClient.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            tab === 'pending' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 16,
                    overflow: 'hidden'
                },
                children: pending.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '60px',
                        textAlign: 'center',
                        color: 'var(--text-muted)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 32,
                                opacity: 0.3,
                                marginBottom: 12
                            },
                            children: "✓"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/AdminClient.tsx",
                            lineNumber: 245,
                            columnNumber: 15
                        }, this),
                        "All projects reviewed — inbox zero!"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/AdminClient.tsx",
                    lineNumber: 244,
                    columnNumber: 13
                }, this) : pending.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProjectRow, {
                        project: p,
                        showModerate: true
                    }, p.id, false, {
                        fileName: "[project]/app/admin/AdminClient.tsx",
                        lineNumber: 249,
                        columnNumber: 30
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminClient.tsx",
                lineNumber: 238,
                columnNumber: 9
            }, this),
            tab === 'projects' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 16,
                    overflow: 'hidden'
                },
                children: allProjects.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProjectRow, {
                        project: p
                    }, p.id, false, {
                        fileName: "[project]/app/admin/AdminClient.tsx",
                        lineNumber: 261,
                        columnNumber: 33
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminClient.tsx",
                lineNumber: 256,
                columnNumber: 9
            }, this),
            tab === 'users' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 16,
                    overflow: 'hidden'
                },
                children: users.map((u, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 14,
                            padding: '14px 20px',
                            borderBottom: i < users.length - 1 ? '1px solid var(--border-subtle)' : 'none'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 36,
                                    height: 36,
                                    borderRadius: '50%',
                                    flexShrink: 0,
                                    background: 'var(--bg-overlay)',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 14,
                                    color: 'var(--accent)'
                                },
                                children: u.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: u.avatar_url,
                                    style: {
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    },
                                    alt: ""
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminClient.tsx",
                                    lineNumber: 285,
                                    columnNumber: 21
                                }, this) : u.username[0]?.toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminClient.tsx",
                                lineNumber: 278,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 14,
                                            fontWeight: 500
                                        },
                                        children: u.full_name || u.username
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminClient.tsx",
                                        lineNumber: 289,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 12,
                                            color: 'var(--text-muted)'
                                        },
                                        children: [
                                            "@",
                                            u.username
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminClient.tsx",
                                        lineNumber: 290,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminClient.tsx",
                                lineNumber: 288,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 10,
                                    padding: '3px 10px',
                                    borderRadius: 99,
                                    background: u.role === 'admin' ? 'rgba(185,64,64,0.1)' : 'var(--bg-overlay)',
                                    color: u.role === 'admin' ? 'var(--danger)' : 'var(--text-muted)'
                                },
                                children: u.role
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminClient.tsx",
                                lineNumber: 292,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>changeRole(u.id, u.role === 'admin' ? 'student' : 'admin'),
                                style: {
                                    padding: '6px 12px',
                                    borderRadius: 6,
                                    border: '1px solid var(--border)',
                                    background: 'none',
                                    fontSize: 12,
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                    color: 'var(--text-secondary)'
                                },
                                children: u.role === 'admin' ? 'Make Student' : 'Make Admin'
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminClient.tsx",
                                lineNumber: 299,
                                columnNumber: 15
                            }, this)
                        ]
                    }, u.id, true, {
                        fileName: "[project]/app/admin/AdminClient.tsx",
                        lineNumber: 273,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminClient.tsx",
                lineNumber: 267,
                columnNumber: 9
            }, this),
            tab === 'reports' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 16,
                    overflow: 'hidden'
                },
                children: reports.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '60px',
                        textAlign: 'center',
                        color: 'var(--text-muted)'
                    },
                    children: "No reports — all clear."
                }, void 0, false, {
                    fileName: "[project]/app/admin/AdminClient.tsx",
                    lineNumber: 319,
                    columnNumber: 13
                }, this) : reports.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '16px 20px',
                            borderBottom: i < reports.length - 1 ? '1px solid var(--border-subtle)' : 'none'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 10,
                                    marginBottom: 6
                                },
                                children: [
                                    r.project_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/projects/${r.project_id}`,
                                        style: {
                                            fontSize: 12,
                                            color: 'var(--accent)',
                                            fontWeight: 500
                                        },
                                        children: "View Project →"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminClient.tsx",
                                        lineNumber: 329,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 11,
                                            color: 'var(--text-muted)',
                                            marginLeft: 'auto'
                                        },
                                        children: new Date(r.created_at).toLocaleDateString()
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminClient.tsx",
                                        lineNumber: 335,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminClient.tsx",
                                lineNumber: 327,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.5
                                },
                                children: r.reason
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminClient.tsx",
                                lineNumber: 339,
                                columnNumber: 15
                            }, this)
                        ]
                    }, r.id, true, {
                        fileName: "[project]/app/admin/AdminClient.tsx",
                        lineNumber: 323,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminClient.tsx",
                lineNumber: 313,
                columnNumber: 9
            }, this),
            tab === 'tags' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 14,
                            padding: '20px',
                            marginBottom: 20,
                            display: 'flex',
                            gap: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: newTagName,
                                onChange: (e)=>setNewTagName(e.target.value),
                                placeholder: "New tag name (e.g. React, Machine Learning)",
                                style: {
                                    flex: 1,
                                    padding: '10px 14px',
                                    borderRadius: 8
                                },
                                onKeyDown: (e)=>e.key === 'Enter' && addTag()
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminClient.tsx",
                                lineNumber: 356,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: addTag,
                                style: {
                                    padding: '10px 20px',
                                    background: 'var(--accent)',
                                    color: '#1c1917',
                                    border: 'none',
                                    borderRadius: 8,
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                    fontSize: 13,
                                    fontWeight: 600
                                },
                                children: "Add Tag"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminClient.tsx",
                                lineNumber: 363,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminClient.tsx",
                        lineNumber: 351,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: 10,
                            flexWrap: 'wrap'
                        },
                        children: tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '6px 12px 6px 14px',
                                    borderRadius: 99,
                                    background: 'var(--bg-surface)',
                                    border: '1px solid var(--border)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 13,
                                            color: 'var(--text-primary)'
                                        },
                                        children: tag.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminClient.tsx",
                                        lineNumber: 380,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>deleteTag(tag.id),
                                        style: {
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: 13,
                                            color: 'var(--text-muted)',
                                            padding: 0,
                                            lineHeight: 1
                                        },
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminClient.tsx",
                                        lineNumber: 381,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, tag.id, true, {
                                fileName: "[project]/app/admin/AdminClient.tsx",
                                lineNumber: 375,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminClient.tsx",
                        lineNumber: 373,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/AdminClient.tsx",
                lineNumber: 349,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/AdminClient.tsx",
        lineNumber: 172,
        columnNumber: 5
    }, this);
}
_s(AdminClient, "63a3KCA8G7+4YP+KufHckU9EwFo=");
_c = AdminClient;
var _c;
__turbopack_context__.k.register(_c, "AdminClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_ae4316b5._.js.map