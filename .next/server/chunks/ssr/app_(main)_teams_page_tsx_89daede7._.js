module.exports = {

"[project]/app/(main)/teams/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TeamsPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Toast.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
// ─── ROLE BADGE ───────────────────────────────────────────────────────────
function RoleBadge({ role }) {
    const styles = {
        leader: {
            bg: 'rgba(201,151,58,0.15)',
            color: 'var(--accent)',
            label: 'Leader'
        },
        admin: {
            bg: 'rgba(185,64,64,0.12)',
            color: 'var(--danger)',
            label: 'Admin'
        },
        contributor: {
            bg: 'rgba(74,124,89,0.12)',
            color: 'var(--success)',
            label: 'Contributor'
        },
        member: {
            bg: 'var(--bg-overlay)',
            color: 'var(--text-muted)',
            label: 'Member'
        }
    };
    const s = styles[role] ?? styles.member;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            fontSize: 9,
            padding: '2px 8px',
            borderRadius: 99,
            background: s.bg,
            color: s.color,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            flexShrink: 0
        },
        children: s.label
    }, void 0, false, {
        fileName: "[project]/app/(main)/teams/page.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
// ─── MEMBER AVATAR STACK ──────────────────────────────────────────────────
function AvatarStack({ members, max = 4 }) {
    const shown = members.slice(0, max);
    const extra = members.length - max;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            alignItems: 'center'
        },
        children: [
            shown.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        background: 'var(--bg-overlay)',
                        border: '2px solid var(--bg-surface)',
                        overflow: 'hidden',
                        marginLeft: i > 0 ? -8 : 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        color: 'var(--accent)',
                        flexShrink: 0,
                        zIndex: shown.length - i,
                        position: 'relative'
                    },
                    children: m.profiles?.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: m.profiles.avatar_url,
                        style: {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        },
                        alt: ""
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/teams/page.tsx",
                        lineNumber: 48,
                        columnNumber: 15
                    }, this) : m.profiles?.username?.[0]?.toUpperCase()
                }, m.profile_id, false, {
                    fileName: "[project]/app/(main)/teams/page.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this)),
            extra > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: 'var(--accent-dim)',
                    border: '2px solid var(--bg-surface)',
                    marginLeft: -8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 9,
                    color: 'var(--accent)',
                    fontWeight: 600,
                    flexShrink: 0
                },
                children: [
                    "+",
                    extra
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/teams/page.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/teams/page.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
// ─── ACTIVITY FEED ITEM ───────────────────────────────────────────────────
function ActivityItem({ icon, text, time }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            padding: '10px 0',
            borderBottom: '1px solid var(--border-subtle)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    flexShrink: 0,
                    background: 'var(--bg-overlay)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13
                },
                children: icon
            }, void 0, false, {
                fileName: "[project]/app/(main)/teams/page.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    minWidth: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 13,
                            color: 'var(--text-secondary)',
                            lineHeight: 1.4
                        },
                        children: text
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/teams/page.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 11,
                            color: 'var(--text-muted)',
                            marginTop: 2
                        },
                        children: time
                    }, void 0, false, {
                        fileName: "[project]/app/(main)/teams/page.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/teams/page.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/teams/page.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
// ─── TEAM CARD ────────────────────────────────────────────────────────────
function TeamCard({ team, isMember, userId }) {
    const members = team.team_members ?? [];
    const myMembership = members.find((m)=>m.profile_id === userId);
    const myRole = myMembership?.role ?? null;
    // Build activity feed from real data
    const activities = [];
    members.slice(0, 3).forEach((m)=>{
        if (m.role === 'leader') {
            activities.push({
                icon: '◎',
                text: `@${m.profiles?.username} leads this team`,
                time: 'Team leader'
            });
        }
    });
    if (members.length > 1) {
        activities.push({
            icon: '⊕',
            text: `${members.length} members collaborating`,
            time: 'Active now'
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: ()=>window.location.href = `/teams/${team.id}`,
        style: {
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 20,
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
            position: 'relative'
        },
        onMouseEnter: (e)=>{
            const el = e.currentTarget;
            el.style.transform = 'translateY(-3px)';
            el.style.borderColor = 'var(--accent)';
            el.style.boxShadow = '0 12px 40px rgba(201,151,58,0.12)';
        },
        onMouseLeave: (e)=>{
            const el = e.currentTarget;
            el.style.transform = 'translateY(0)';
            el.style.borderColor = 'var(--border-subtle)';
            el.style.boxShadow = 'none';
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: 6,
                    background: isMember ? 'linear-gradient(90deg, var(--accent), rgba(201,151,58,0.3))' : 'var(--bg-overlay)'
                }
            }, void 0, false, {
                fileName: "[project]/app/(main)/teams/page.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '20px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 14,
                            marginBottom: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 52,
                                    height: 52,
                                    borderRadius: 14,
                                    flexShrink: 0,
                                    background: 'var(--bg-overlay)',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 22,
                                    color: 'var(--accent)',
                                    border: '1px solid var(--border-subtle)'
                                },
                                children: team.logo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: team.logo_url,
                                    style: {
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    },
                                    alt: ""
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 163,
                                    columnNumber: 17
                                }, this) : team.name[0]?.toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/teams/page.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    minWidth: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8,
                                            marginBottom: 4,
                                            flexWrap: 'wrap'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                                                    fontSize: 20,
                                                    fontWeight: 400,
                                                    color: 'var(--text-primary)',
                                                    lineHeight: 1.1
                                                },
                                                children: team.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/page.tsx",
                                                lineNumber: 169,
                                                columnNumber: 15
                                            }, this),
                                            myRole && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RoleBadge, {
                                                role: myRole
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/page.tsx",
                                                lineNumber: 176,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/teams/page.tsx",
                                        lineNumber: 168,
                                        columnNumber: 13
                                    }, this),
                                    team.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 12,
                                            color: 'var(--text-muted)',
                                            lineHeight: 1.5
                                        },
                                        children: [
                                            team.description.slice(0, 70),
                                            team.description.length > 70 ? '…' : ''
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/teams/page.tsx",
                                        lineNumber: 179,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/teams/page.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/teams/page.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    activities.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'var(--bg-overlay)',
                            borderRadius: 10,
                            padding: '10px 12px',
                            marginBottom: 14
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 9,
                                    letterSpacing: '0.12em',
                                    color: 'var(--text-muted)',
                                    textTransform: 'uppercase',
                                    marginBottom: 6
                                },
                                children: "Activity"
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/teams/page.tsx",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this),
                            activities.map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        paddingTop: i > 0 ? 6 : 0,
                                        borderTop: i > 0 ? '1px solid var(--border-subtle)' : 'none'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 11
                                            },
                                            children: a.icon
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/teams/page.tsx",
                                            lineNumber: 202,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 11,
                                                color: 'var(--text-secondary)',
                                                flex: 1
                                            },
                                            children: a.text
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/teams/page.tsx",
                                            lineNumber: 203,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 10,
                                                color: 'var(--text-muted)',
                                                flexShrink: 0
                                            },
                                            children: a.time
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/teams/page.tsx",
                                            lineNumber: 204,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 197,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/teams/page.tsx",
                        lineNumber: 188,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: 14,
                            borderTop: '1px solid var(--border-subtle)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AvatarStack, {
                                members: members
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/teams/page.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 12,
                                            color: 'var(--text-muted)'
                                        },
                                        children: [
                                            members.length,
                                            " member",
                                            members.length !== 1 ? 's' : ''
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/teams/page.tsx",
                                        lineNumber: 217,
                                        columnNumber: 13
                                    }, this),
                                    isMember ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 10,
                                            padding: '3px 10px',
                                            borderRadius: 99,
                                            background: 'rgba(74,124,89,0.1)',
                                            color: 'var(--success)',
                                            fontWeight: 600
                                        },
                                        children: "✓ Joined"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/teams/page.tsx",
                                        lineNumber: 221,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 10,
                                            padding: '3px 10px',
                                            borderRadius: 99,
                                            background: 'var(--accent-dim)',
                                            color: 'var(--accent)',
                                            fontWeight: 600
                                        },
                                        children: "View →"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/teams/page.tsx",
                                        lineNumber: 229,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/teams/page.tsx",
                                lineNumber: 216,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/teams/page.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(main)/teams/page.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(main)/teams/page.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
function TeamsPage() {
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('mine');
    const [myTeams, setMyTeams] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [allTeams, setAllTeams] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [invitations, setInvites] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [userId, setUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [creating, setCreating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newName, setNewName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [newDesc, setNewDesc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [pendingCount, setPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [showCreate, setShowCreate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        supabase.auth.getUser().then(async ({ data: { user } })=>{
            if (!user) {
                window.location.href = '/login';
                return;
            }
            setUserId(user.id);
            await loadAll(user.id);
        });
    }, []);
    async function loadAll(uid) {
        setLoading(true);
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const [{ data: memberRows }, { data: allRaw }, { data: inviteRaw }] = await Promise.all([
            supabase.from('team_members').select('team_id').eq('profile_id', uid),
            supabase.from('teams').select(`*, team_members(profile_id, role, profiles(id,username,avatar_url,full_name))`).order('created_at', {
                ascending: false
            }),
            supabase.from('team_invitations').select(`*, teams(id,name,logo_url), profiles!team_invitations_invited_by_fkey(id,username,avatar_url,full_name)`).eq('invited_user', uid).eq('status', 'pending')
        ]);
        const myTeamIds = (memberRows ?? []).map((r)=>r.team_id);
        const all = allRaw ?? [];
        setMyTeams(all.filter((t)=>myTeamIds.includes(t.id)));
        setAllTeams(all);
        setInvites(inviteRaw ?? []);
        setPending(inviteRaw?.length ?? 0);
        setLoading(false);
    }
    async function createTeam() {
        if (!newName.trim() || !userId) return;
        setCreating(true);
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: team, error } = await supabase.from('teams').insert({
            name: newName.trim(),
            description: newDesc.trim() || null,
            created_by: userId
        }).select().single();
        if (error || !team) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])('Failed to create team', 'error');
            setCreating(false);
            return;
        }
        await supabase.from('team_members').insert({
            team_id: team.id,
            profile_id: userId,
            role: 'leader'
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])('Team created!', 'success');
        window.location.href = `/teams/${team.id}`;
    }
    async function respondInvite(inviteId, status, teamId) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        await supabase.from('team_invitations').update({
            status
        }).eq('id', inviteId);
        if (status === 'accepted' && userId) {
            await supabase.from('team_members').insert({
                team_id: teamId,
                profile_id: userId,
                role: 'member'
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])('Joined team!', 'success');
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])('Invitation declined');
        }
        await loadAll(userId);
    }
    const tabStyle = (t)=>({
            padding: '9px 18px',
            border: 'none',
            borderRadius: 8,
            background: tab === t ? 'var(--accent-dim)' : 'transparent',
            color: tab === t ? 'var(--accent)' : 'var(--text-secondary)',
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: tab === t ? 500 : 400,
            cursor: 'pointer',
            transition: 'all 0.15s',
            position: 'relative'
        });
    const browsedTeams = allTeams.filter((t)=>!search || t.name.toLowerCase().includes(search.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '48px 48px 80px',
            width: '100%'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: 1200,
                margin: '0 auto'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-fade-up",
                    style: {
                        marginBottom: 40
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 16
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontFamily: 'var(--font-cormorant), Georgia, serif',
                                            fontSize: 'clamp(48px, 7vw, 72px)',
                                            fontWeight: 400,
                                            lineHeight: 1,
                                            marginBottom: 8
                                        },
                                        children: "Teams"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/teams/page.tsx",
                                        lineNumber: 332,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 14,
                                            color: 'var(--text-muted)'
                                        },
                                        children: [
                                            allTeams.length,
                                            " team",
                                            allTeams.length !== 1 ? 's' : '',
                                            " at ITM University"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(main)/teams/page.tsx",
                                        lineNumber: 339,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(main)/teams/page.tsx",
                                lineNumber: 331,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowCreate((o)=>!o),
                                style: {
                                    padding: '12px 24px',
                                    borderRadius: 12,
                                    background: showCreate ? 'var(--bg-overlay)' : 'var(--accent)',
                                    color: showCreate ? 'var(--text-secondary)' : '#1c1917',
                                    border: showCreate ? '1px solid var(--border)' : 'none',
                                    fontSize: 13,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                    transition: 'all 0.2s'
                                },
                                children: showCreate ? '✕ Cancel' : '+ Create Team'
                            }, void 0, false, {
                                fileName: "[project]/app/(main)/teams/page.tsx",
                                lineNumber: 343,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(main)/teams/page.tsx",
                        lineNumber: 330,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(main)/teams/page.tsx",
                    lineNumber: 329,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-fade-up delay-1",
                    style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: 1,
                        background: 'var(--border)',
                        borderRadius: 16,
                        overflow: 'hidden',
                        border: '1px solid var(--border)',
                        marginBottom: 36
                    },
                    children: [
                        {
                            num: allTeams.length,
                            label: 'Total Teams'
                        },
                        {
                            num: myTeams.length,
                            label: 'My Teams'
                        },
                        {
                            num: allTeams.reduce((acc, t)=>acc + (t.team_members?.length ?? 0), 0),
                            label: 'Total Members'
                        },
                        {
                            num: pendingCount,
                            label: 'Invitations'
                        }
                    ].map(({ num, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: 'var(--bg-surface)',
                                padding: '20px 16px',
                                textAlign: 'center'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                                        fontSize: 40,
                                        fontWeight: 300,
                                        color: 'var(--text-primary)',
                                        lineHeight: 1,
                                        marginBottom: 6
                                    },
                                    children: num
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 371,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 10,
                                        color: 'var(--text-muted)',
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase'
                                    },
                                    children: label
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 377,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, label, true, {
                            fileName: "[project]/app/(main)/teams/page.tsx",
                            lineNumber: 370,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/(main)/teams/page.tsx",
                    lineNumber: 357,
                    columnNumber: 9
                }, this),
                showCreate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-fade-up",
                    style: {
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 20,
                        padding: '32px',
                        marginBottom: 32
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontFamily: 'var(--font-cormorant), Georgia, serif',
                                fontSize: 28,
                                marginBottom: 6
                            },
                            children: "New Team"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/teams/page.tsx",
                            lineNumber: 391,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 13,
                                color: 'var(--text-muted)',
                                marginBottom: 24
                            },
                            children: "You'll be the leader. Invite others after creation."
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/teams/page.tsx",
                            lineNumber: 394,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'grid',
                                gap: 14
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: newName,
                                    onChange: (e)=>setNewName(e.target.value),
                                    placeholder: "Team name (e.g. Team Nebula)",
                                    style: {
                                        padding: '12px 14px',
                                        borderRadius: 10
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 398,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: newDesc,
                                    onChange: (e)=>setNewDesc(e.target.value),
                                    placeholder: "What does your team work on? What's the goal?",
                                    rows: 3,
                                    style: {
                                        padding: '12px 14px',
                                        borderRadius: 10,
                                        resize: 'vertical'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 400,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: 10
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: createTeam,
                                        disabled: creating || !newName.trim(),
                                        style: {
                                            padding: '12px 28px',
                                            background: newName.trim() ? 'var(--accent)' : 'var(--border)',
                                            color: newName.trim() ? '#1c1917' : 'var(--text-muted)',
                                            border: 'none',
                                            borderRadius: 10,
                                            fontSize: 13,
                                            fontWeight: 600,
                                            cursor: newName.trim() ? 'pointer' : 'not-allowed',
                                            fontFamily: 'inherit',
                                            transition: 'all 0.2s'
                                        },
                                        children: creating ? 'Creating…' : 'Create Team →'
                                    }, void 0, false, {
                                        fileName: "[project]/app/(main)/teams/page.tsx",
                                        lineNumber: 404,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 403,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/teams/page.tsx",
                            lineNumber: 397,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/teams/page.tsx",
                    lineNumber: 386,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-fade-up delay-2",
                    style: {
                        display: 'flex',
                        gap: 4,
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 12,
                        padding: 4,
                        marginBottom: 28,
                        width: 'fit-content'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            style: tabStyle('mine'),
                            onClick: ()=>setTab('mine'),
                            children: [
                                "My Teams ",
                                myTeams.length > 0 && `(${myTeams.length})`
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/teams/page.tsx",
                            lineNumber: 425,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            style: tabStyle('browse'),
                            onClick: ()=>setTab('browse'),
                            children: "Browse All"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/teams/page.tsx",
                            lineNumber: 428,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            style: {
                                ...tabStyle('invitations'),
                                paddingRight: pendingCount > 0 ? 28 : 18
                            },
                            onClick: ()=>setTab('invitations'),
                            children: [
                                "Invitations",
                                pendingCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        position: 'absolute',
                                        top: 5,
                                        right: 5,
                                        width: 14,
                                        height: 14,
                                        borderRadius: '50%',
                                        background: 'var(--danger)',
                                        color: 'white',
                                        fontSize: 8,
                                        fontWeight: 700,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    },
                                    children: pendingCount
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 435,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/teams/page.tsx",
                            lineNumber: 431,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/teams/page.tsx",
                    lineNumber: 420,
                    columnNumber: 9
                }, this),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: 'center',
                        padding: '80px',
                        color: 'var(--text-muted)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 32,
                                opacity: 0.3,
                                marginBottom: 12
                            },
                            children: "◎"
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/teams/page.tsx",
                            lineNumber: 451,
                            columnNumber: 13
                        }, this),
                        "Loading teams…"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(main)/teams/page.tsx",
                    lineNumber: 450,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        tab === 'mine' && (myTeams.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                padding: '80px 40px',
                                background: 'var(--bg-surface)',
                                border: '2px dashed var(--border)',
                                borderRadius: 20
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 48,
                                        opacity: 0.2,
                                        marginBottom: 16
                                    },
                                    children: "◎"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 466,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                                        fontSize: 28,
                                        fontWeight: 400,
                                        marginBottom: 8
                                    },
                                    children: "You're not in any teams yet"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 467,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 14,
                                        color: 'var(--text-muted)',
                                        marginBottom: 24
                                    },
                                    children: "Create one or browse existing teams to join."
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 473,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: 10,
                                        justifyContent: 'center',
                                        flexWrap: 'wrap'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowCreate(true),
                                            style: {
                                                padding: '11px 24px',
                                                borderRadius: 10,
                                                background: 'var(--accent)',
                                                color: '#1c1917',
                                                border: 'none',
                                                fontSize: 13,
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                fontFamily: 'inherit'
                                            },
                                            children: "+ Create Team"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/teams/page.tsx",
                                            lineNumber: 477,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setTab('browse'),
                                            style: {
                                                padding: '11px 24px',
                                                borderRadius: 10,
                                                background: 'none',
                                                border: '1px solid var(--border)',
                                                fontSize: 13,
                                                cursor: 'pointer',
                                                fontFamily: 'inherit',
                                                color: 'var(--text-secondary)'
                                            },
                                            children: "Browse Teams →"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/teams/page.tsx",
                                            lineNumber: 484,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 476,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/teams/page.tsx",
                            lineNumber: 460,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                gap: 20
                            },
                            children: myTeams.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TeamCard, {
                                    team: t,
                                    isMember: true,
                                    userId: userId
                                }, t.id, false, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 496,
                                    columnNumber: 21
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/teams/page.tsx",
                            lineNumber: 494,
                            columnNumber: 17
                        }, this)),
                        tab === 'browse' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: search,
                                    onChange: (e)=>setSearch(e.target.value),
                                    placeholder: "Search teams…",
                                    style: {
                                        width: '100%',
                                        maxWidth: 400,
                                        padding: '10px 14px',
                                        borderRadius: 10,
                                        marginBottom: 24
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 505,
                                    columnNumber: 17
                                }, this),
                                browsedTeams.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: 'center',
                                        padding: '60px',
                                        color: 'var(--text-muted)'
                                    },
                                    children: "No teams found"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 512,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                        gap: 20
                                    },
                                    children: browsedTeams.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TeamCard, {
                                            team: t,
                                            isMember: myTeams.some((m)=>m.id === t.id),
                                            userId: userId
                                        }, t.id, false, {
                                            fileName: "[project]/app/(main)/teams/page.tsx",
                                            lineNumber: 518,
                                            columnNumber: 23
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 516,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true),
                        tab === 'invitations' && (invitations.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                padding: '80px 40px',
                                background: 'var(--bg-surface)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: 20
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 36,
                                        opacity: 0.2,
                                        marginBottom: 12
                                    },
                                    children: "🔔"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 538,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                                        fontSize: 22,
                                        marginBottom: 8
                                    },
                                    children: "No pending invitations"
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 539,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 13,
                                        color: 'var(--text-muted)'
                                    },
                                    children: "When someone invites you to a team, it shows up here."
                                }, void 0, false, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 542,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(main)/teams/page.tsx",
                            lineNumber: 532,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 12
                            },
                            children: invitations.map((inv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: 'var(--bg-surface)',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: 16,
                                        padding: '20px 24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 16,
                                        flexWrap: 'wrap'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 48,
                                                height: 48,
                                                borderRadius: 14,
                                                flexShrink: 0,
                                                background: 'var(--bg-overlay)',
                                                overflow: 'hidden',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: 20,
                                                color: 'var(--accent)',
                                                border: '1px solid var(--border-subtle)'
                                            },
                                            children: inv.teams?.logo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: inv.teams.logo_url,
                                                style: {
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                },
                                                alt: ""
                                            }, void 0, false, {
                                                fileName: "[project]/app/(main)/teams/page.tsx",
                                                lineNumber: 564,
                                                columnNumber: 29
                                            }, this) : inv.teams?.name?.[0]?.toUpperCase()
                                        }, void 0, false, {
                                            fileName: "[project]/app/(main)/teams/page.tsx",
                                            lineNumber: 556,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flex: 1,
                                                minWidth: 160
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                                                        fontSize: 20,
                                                        fontWeight: 400,
                                                        color: 'var(--text-primary)',
                                                        marginBottom: 3
                                                    },
                                                    children: inv.teams?.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                                    lineNumber: 568,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 12,
                                                        color: 'var(--text-muted)'
                                                    },
                                                    children: [
                                                        "Invited by @",
                                                        inv.profiles?.username
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                                    lineNumber: 574,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/teams/page.tsx",
                                            lineNumber: 567,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                gap: 8
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>respondInvite(inv.id, 'accepted', inv.team_id),
                                                    style: {
                                                        padding: '9px 20px',
                                                        background: 'var(--success)',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: 9,
                                                        cursor: 'pointer',
                                                        fontFamily: 'inherit',
                                                        fontSize: 13,
                                                        fontWeight: 600
                                                    },
                                                    children: "Accept"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                                    lineNumber: 579,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>respondInvite(inv.id, 'declined', inv.team_id),
                                                    style: {
                                                        padding: '9px 16px',
                                                        background: 'none',
                                                        border: '1px solid var(--border)',
                                                        borderRadius: 9,
                                                        cursor: 'pointer',
                                                        fontFamily: 'inherit',
                                                        fontSize: 13,
                                                        color: 'var(--text-secondary)'
                                                    },
                                                    children: "Decline"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                                    lineNumber: 586,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(main)/teams/page.tsx",
                                            lineNumber: 578,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, inv.id, true, {
                                    fileName: "[project]/app/(main)/teams/page.tsx",
                                    lineNumber: 549,
                                    columnNumber: 21
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/(main)/teams/page.tsx",
                            lineNumber: 547,
                            columnNumber: 17
                        }, this))
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(main)/teams/page.tsx",
            lineNumber: 326,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(main)/teams/page.tsx",
        lineNumber: 325,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=app_%28main%29_teams_page_tsx_89daede7._.js.map